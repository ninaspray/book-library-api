const {
  getAllItems,
  createItem,
  updateItem,
  getItemById,
  deleteItem,
} = require('./helpers');

// const getBooks = (_, res) => {
//   Book.findAll().then(books => {
//     res.status(200).json(books);
//   });
// }
// const createBook = (req, res) => {
//   const newBook = req.body;
//   Book
//     .create(newBook)
//     .then(newBookCreated => res.status(201).json(newBookCreated));
// };
const getBooks = (_, res) => getAllItems(res, 'book');

const createBook = (req, res) => createItem(res, 'book', req.body);


// const updateBook = (req, res) => {
//   const { id } = req.params;
//   const newDetails = req.body;

//   Book
//     .update(newDetails, { where: { id } })
//     .then(([recordsUpdated]) => {
//       if (!recordsUpdated) {
//         res.status(404).json({ error: 'The book could not be found.' });
//     } else {
//       Book.findByPk(id).then((updatedBook) => {
//         res
//         .status(200)
//         .json(updatedBook);
//     }
//       )}
//   });
// }

const updateBook = (req, res) =>
  updateItem(res, 'book', req.body, req.params.id);



// const getBookById = (req, res) => {
//   const { id } = req.params;

//   Book.findByPk(id).then(book => {
//     if (!book) {
//       res
//         .status(404)
//         .json({ error: 'The book could not be found.' });
//     } else {
//       res
//         .status(200)
//         .json(book);
//     }
//   });
// }
const getBookById = (req, res) => getItemById(res, 'book', req.params.id);


// const deleteBook = (req, res) => {
//   const { id } = req.params;

//   Book
//     .findByPk(id)
//     .then(foundBook => {
//       if (!foundBook) {
//         res.status(404).json({ error: 'The book could not be found.' });
//       } else {
//         Book
//           .destroy({ where: { id } })
//           .then(() => {
//             res.status(204).send();
//         });
//     }
//   });
// }

const deleteBook = (req, res) => deleteItem(res, 'book', req.params.id);

module.exports = {
    getBooks,
    createBook,
    deleteBook, 
    getBookById,
    updateBook
  }