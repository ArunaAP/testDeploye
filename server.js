const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Dummy data
let books = [
  { id: 1, title: 'Book 1', author: 'Author 1' },
  { id: 2, title: 'Book 2', author: 'Author 2' },
  { id: 3, title: 'Book 3', author: 'Author 3' },
];

app.use(bodyParser.json());

// Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Get a book by ID
app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((book) => book.id === id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }
});

// Add a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const id = books.length + 1;
  const newBook = { id, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update a book
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex !== -1) {
    books[bookIndex] = { id, title, author };
    res.json(books[bookIndex]);
  } else {
    res.status(404).send('Book not found');
  }
});

// Delete a book
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter((book) => book.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
