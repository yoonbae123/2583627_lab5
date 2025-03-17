const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
let whoami = {
    studentNumber: "2583627"
  }
let books = [];

app.get('/whoami',(req,res) => {
    res.status(200).json(whoami);
})
app.get('/books',(req,res) => {
  res.status(200).json(books);
});

app.get('/books/:id',(req,res) => {
  const bookID = parseInt(req.params.id);
  const book = books.find(b => b.id === bookID);
  if (!book) {
    return res.status(404).json({ error: "not found" });
  }
  res.status(200).json(book);
});

app.post('/books',(req,res) => {
  const newBook = req.body;
  newBook.id = books.length + 1;
  newBook.details = newBook.details || []; 
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/books/:id',(req,res) => {
  const bookID = parseInt(req.params.id);
  const bookIndex = books.findIndex(c=>c.id===bookID);
  if (bookIndex===-1) {
    return res.status(404).json({error:"not found"});
  }else{
    const book = req.body;
    books[bookIndex] = book;
    res.status(200).json(book);
  }
});

app.delete('/books/:id',(req, res) => {
  const bookID = parseInt(req.params.id);
  const bookIndex = books.findIndex(b=>b.id===bookID);
  if (bookIndex===-1){
    return res.status(404).json({error:"not found"});}
  books.splice(bookIndex,1);
  res.status(204).send(); 
});

app.post('/books/:id/details',(req,res)=>{
  const bookID = parseInt(req.params.id);
  const book = books.find(b=>b.id===bookID);
  if (!book) {
    return res.status(404).json({error:"not found"});}
  const newDetail = req.body;
  book.details.push(newDetail);
  res.status(201).json(newDetail);
});

app.delete('/books/:id/details/:detailID',(req,res)=>{
  const bookID = parseInt(req.params.id);
  const detailID = req.params.detailID;
  const book = books.find(b=>b.id===bookID);
  if (!book){
      return res.status(404).json({error:"Book not found"});}
  const detailIndex =book.details.findIndex(d=>d.id===detailID);
  if (detailIndex=== -1) {
      return res.status(404).json({error:"Detail not found"});}
  book.details.splice(detailIndex,1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});