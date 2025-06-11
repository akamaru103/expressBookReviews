const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// TASK 6.1 - Complete the code for registering a new user
// Check if a user with the given username already exists
const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}


public_users.post("/register", (req,res) => {
    // TASK 6.2 - Complete the code for registering a new user
    const username = req.body.username;
    const password = req.body.password;
    let errorDetails ="";

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesExist(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can log in."});
        } else {
            return res.status(404).json({message: "User already exists."});
        }
    } else if (!username && !password){
        errorDetails="No username or password provided.";
    } else if (!username && password){
        errorDetails="No username provided.";
    } else if (!password && username){
        errorDetails="No password provided.";
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user. " + errorDetails});
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
