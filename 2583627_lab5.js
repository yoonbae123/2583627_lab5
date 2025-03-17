const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
let whoami = {
    studentNumber: "12345678"
  }
let books = [
    {
        id: "1",
        title: "To Kill a Mockingbird",
        details: [
          {
            id: "1",
            author: "Harper Lee",
            genre: "Fiction",
            publicationYear: 1960
          }
        ]
      }
];

app.get('/books', (req, res) => {
  res.status(200).json(books);
});

app.get('/books/:id', (req, res) => {
  const bookID = parseInt(req.params.id);
  const book = books.find(b => b.id === bookID);
  if (!book) {
    return res.status(404).json({ error: "not found" });
  }
  res.status(200).json(book);
});

app.post('/books', (req, res) => {
  const newBook = req.body;
  newBook.id = books.length + 1;
  newBook.details = []; 
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
  const bookID = parseInt(req.params.id);
  const bookIndex = books.findIndex(c => c.id === bookID);
  if (bookIndex===-1) {
    return res.status(404).json({ error: "not found" });
  }
  books[bookIndex] = { ...books[bookIndex], ...req.body, id: bookID };
  res.status(200).json(books[bookIndex]);
});

app.delete('/books/:id', (req, res) => {
  const bookID = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === bookID);
  if (bookIndex === -1) {
    return res.status(404).json({ error: "not found" });
  }
  cars.splice(carIndex, 1);
  res.status(204).send(); 
});

app.post('/books/:id/details', (req, res) => {
  const bookID = parseInt(req.params.id);
  const book = books.find(b => b.id === bookID);
  if (!book) {
    return res.status(404).json({ error: "not found" });
  }
  const newDetail = req.body;
  book.specs.push(newBook);
  res.status(201).json(newBook);
});

app.delete('/books/:id/details/:detailID', (req, res) => {
  const bookID = parseInt(req.params.id);
  const bookIndex = parseInt(req.params.bookIndex);
  const book = books.find(b => b.id === bookID);
  if (!book) {
    return res.status(404).json({ error: "not found" });
  }
  if (bookIndex < 0 || bookIndex >= book.details.length) {
    return res.status(400).json({ error: "Bad Missing required book details" });
  }
  book.specs.splice(bookIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});