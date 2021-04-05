/* eslint-disable no-console */
const { expect } = require('chai');
const request = require('supertest');
const { Book } = require('../src/models');
const app = require('../src/app');
const book = require('../src/models/book');

describe('/books', () => {
  before(async () => Book.sequelize.sync());

  describe('with no records in the database', () => {
    describe('POST /books', () => {
      it('creates a new book in the database', async () => {
        const response = await request(app).post('/books').send({
          title: 'Fear and Loathing in Las Vegas',
          author: 'Hunter S Thompson',
          genre: 'Journalism',
          ISBN: '9780007161232',
        });
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });
        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal('Fear and Loathing in Las Vegas');
        expect(response.body.author).to.equal('Hunter S Thompson');
        expect(response.body.genre).to.equal('Journalism');
        expect(response.body.ISBN).to.equal('9780007161232');

        expect(newBookRecord.title).to.equal('Fear and Loathing in Las Vegas');
        expect(newBookRecord.author).to.equal('Hunter S Thompson');
        expect(newBookRecord.genre).to.equal('Journalism');
        expect(newBookRecord.ISBN).to.equal('9780007161232');
        
      });
    });
  });

  describe('with records in the database', () => {
    let books;
    beforeEach(async () => {
      await Book.destroy({ where: {} });

      books = await Promise.all([
        Book.create({
          title: 'Fear and Loathing in Las Vegas',
          author: 'Hunter S Thompson',
          genre: 'Journalism',
          ISBN: '9780007161232',
        }),
        Book.create({ title: 'The Devil Wears Prada',
        author: 'Lauren Weisberger',
        genre: 'Novel Fiction',
        ISBN: '9780007156108', }),
        Book.create({ title: 'The Woman In Black',
        author: 'Susan Hill',
        genre: 'Novel Horror',
        ISBN: '9780241109878', }),
      ]);
    });

    describe('GET /books', () => {
      it('gets all book records', async () => {
        const response = await request(app).get('/books');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((book) => {
          const expected = books.find((a) => a.id === book.id);
          
          expect(response.status).to.equal(200);
          expect(book.title).to.equal(expected.title);
          expect(book.author).to.equal(expected.author);
          expect(book.genre).to.equal(expected.genre);
          expect(book.ISBN).to.equal(expected.ISBN);
        });
      });
      
      describe('GET /books/:id', () => {
        it('gets books record by id', async () => {
          const book = books[0];
          const response = await request(app).get(`/books/${book.id}`);
  
          expect(response.status).to.equal(200);
          expect(book.title).to.equal(book.title);
          expect(book.author).to.equal(book.author);
          expect(book.genre).to.equal(book.genre);
          expect(book.ISBN).to.equal(book.ISBN);
        });
  
        it('returns a 404 if the book does not exist', async () => {
          const response = await request(app).get('/books/12345');
  
          expect(response.status).to.equal(404);
          expect(response.body.error).to.equal('The book could not be found.');
        });
      });
  
      describe('PATCH /books/:id', () => {
        it('updates books Author by id', async () => {
          const book = books[0];
          const response = await request(app)
            .patch(`/books/${book.id}`)
            .send({ author: 'Hunter.S.Thompson' });
          const updatedBookRecord = await Book.findByPk(book.id, {
            raw: true,
          });
  
          expect(response.status).to.equal(200);
          expect(updatedBookRecord.author).to.equal('Hunter.S.Thompson');
        });
  
        it('returns a 404 if the book does not exist', async () => {
          const response = await request(app)
            .patch('/books/12345')
            .send({ author: 'Nina Spray' });
  
          expect(response.status).to.equal(404);
          expect(response.body.error).to.equal('The book could not be found.');
        });
      });
  
      describe('DELETE /books/:id', () => {
        it('deletes book record by id', async () => {
          const book = books[0];
          const response = await request(app).delete(`/books/${book.id}`);
          const deletedBook = await Book.findByPk(book.id, { raw: true });
  
          expect(response.status).to.equal(204);
          expect(deletedBook).to.equal(null);
        });
  
        it('returns a 404 if the book does not exist', async () => {
          const response = await request(app).delete('/books/12345');
          expect(response.status).to.equal(404);
          expect(response.body.error).to.equal('The book could not be found.');
        });
      });
    });
  });
});  