const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
let whoami = {
    studentNumber: "2583627"
  }
let books = [];

app.get('/whoami',(req,res)=>{
    res.status(200).json(whoami);
})
app.get('/books',(req,res)=>{
  res.status(200).json(books);
});

app.get('/books/:id',(req,res)=>{
  const bookID = parseInt(req.params.id);
  const book = books.find(b => b.id === bookID);
  if (!book) {
    return res.status(404).json({ error: "not found" });
  }
  res.status(200).json(book);
});

app.post('/books',(req,res)=>{
  const newBook = req.body;
  if (!newBook.title || !Array.isArray(newBook.details)) {
    return res.status(400).json({error:"Missing required book details"});}
  newBook.id = books.length + 1;
  newBook.details = newBook.details || []; 
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/books/:id',(req,res)=>{
  const bookID = parseInt(req.params.id);
  const bookIndex = books.findIndex(c=>c.id===bookID);
  if (bookIndex===-1) {
    return res.status(404).json({error:"not found"});
  }else{
    books[bookIndex] = { ...books[bookIndex], ...req.body, id: bookID };
    res.status(200).json(books[bookIndex]);
  }
});

app.delete('/books/:id',(req, res) => {
  const bookID = parseInt(req.params.id);
  const bookIndex = books.findIndex(b=>b.id===bookID);
  if (bookIndex===-1){
    return res.status(404).json({error:"not found"});}
    books.splice(bookIndex, 1);
    res.status(200).json({message:"Successfully deleted"});
});

app.post('/books/:id/details',(req, res)=>{
  const bookID = parseInt(req.params.id);
  const book = books.find(b=>b.id === bookID);
  if (!book) {
      return res.status(404).json({error:"not found"});}
  const newDetail=req.body;
  newDetail.id=(book.details.length+1).toString();
  book.details.push(newDetail);
  res.status(201).json(newDetail);
});

app.delete('/books/:id/details/:detailID',(req,res)=>{
  const bookID = parseInt(req.params.id);
  const detailID = req.params.detailID;
  const book = books.find(b => b.id === bookID);
  if(!book){
      return res.status(404).json({error:"Book not found"});}
  const detailIndex = book.details.findIndex(d=>d.id===detailID);
  if(detailIndex === -1){
      return res.status(404).json({error:"Detail not found"});}
  book.details.splice(detailIndex, 1);
  res.status(200).json({message:"Successfully deleted"});
});

app.listen(port,()=>{
  console.log(`Server running on http://localhost:${port}`);
});