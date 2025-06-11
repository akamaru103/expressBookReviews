const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    // TASK 1 - Send JSON response with formatted books data
    res.send(JSON.stringify(books, null, 2));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    // TASK 2 - Retrieve the ISBN parameter from the request URL and send the corresponding book's details
    const isbn = req.params.isbn;
    res.send(books[isbn]);
 }); 
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    // TASK 3 - Get book details from author
    const author = req.params.author;
    const booksArray = Object.values(books);
    let filtered_books = booksArray.filter((book) => book.author === author);
    res.send(filtered_books); 
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    // TASK 4 - Get book details from title
    const title = req.params.title;
    const booksArray = Object.values(books);
    let filtered_books = booksArray.filter((book) => book.title === title);
    res.send(filtered_books); 
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  // TASK 5 - Get reviews by ISBN
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews);
});

module.exports.general = public_users;
