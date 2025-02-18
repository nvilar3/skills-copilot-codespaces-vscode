// Create web server
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to serve static files from the public directory
app.use(express.static('public'));

// Read comments from file
function readComments() {
    const data = fs.readFileSync('comments.json', 'utf8');
    return JSON.parse(data);
}

// Write comments to file
function writeComments(comments) {
    fs.writeFileSync('comments.json', JSON.stringify(comments, null, 2));
}

// API to get all comments
app.get('/api/comments', (req, res) => {
    const comments = readComments();
    res.json(comments);
});

// API to add a new comment
app.post('/api/comments', (req, res) => {
    const newComment = req.body;
    const comments = readComments();
    comments.push(newComment);
    writeComments(comments);
    res.status(201).json(newComment);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});