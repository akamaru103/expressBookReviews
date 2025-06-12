const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];



const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
// TASK 7.1
    // Filter the users array for any user with the same username and password
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    // Return true if any valid user is found, otherwise false
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}


//only registered users can login
regd_users.post("/login", (req,res) => {
  //TASK 7.2 - Complete the code for logging in as a registered user
    const username = req.body.username;
    const password = req.body.password;

    // Check if username or password is missing
    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }

    // Authenticate user
    if (authenticatedUser(username, password)) {
        // Generate JWT access token
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60*60 });

        // Store access token and username in session
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password." });
    }
}); 

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    // TASK 8 - Complete the code for adding or modifying a book review
    const isbn = req.params.isbn;
    let filteredBook = books[isbn];
    if (filteredBook) {
        let review = req.query.review;
        let reviewer = req.session.authorization['username'];
        if (review) {
            filteredBook['reviews'][reviewer] = review;
            books[isbn] = filteredBook;
        }
        res.send(`The review for the book with ISBN  ${isbn} has been added/updated.`);
    }
    else {
        res.send("Unable to find this ISBN!");
    }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    // TASK 9 - Complete the code for deleting a book review
    const isbn = req.params.isbn;
    let filteredBook = books[isbn];
    if (filteredBook) {
        let reviewer = req.session.authorization['username'];
        delete filteredBook['reviews'][reviewer];
        res.send(`The review for the book with ISBN  ${isbn} has been deleted.`);
    }
    else {
        res.send("Unable to find this ISBN!");
    }    
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
