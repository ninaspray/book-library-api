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
          genre: 'Gonzo Jounalism',
          ISBN: '9780007161232'
        });
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });
        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal('Fear and Loathing in Las Vegas');
        expect(newBookRecord.title).to.equal('Fear and Loathing in Las Vegas');
        expect(newBookRecord.author).to.equal('Hunter S Thompson');
        expect(newBookRecord.genre).to.equal('Gonzo Jounalism');
        expect(newBookRecord.ISBN).to.equal('9780007161232');
        //console.log(response.body) - Testing Password
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
          genre: 'Gonzo Jounalism',
          ISBN: '9780007161232',
        }),
        //Reader.create({ name: 'Arya Stark', email: 'vmorgul@me.com', password: 'carrot' }),
        //Reader.create({ name: 'Lyra Belacqua', email: 'darknorth123@msn.org', password: 'parsnip' }),
      ]);
    });

    describe('GET /books', () => {
      it('gets all book records', async () => {
        const response = await request(app).get('/books');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(1);

        response.body.forEach((book) => {
          const expected = books.find((a) => a.id === book.id);

          expect(book.title).to.equal(expected.title);
          expect(book.author).to.equal(expected.author);
          expect(book.genre).to.equal(expected.genre);
          expect(book.ISBN).to.equal(expected.ISBN);
        });
      });
    });});});