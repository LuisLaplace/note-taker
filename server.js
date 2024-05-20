const express = require('express');
const path = require('path');
const { clog } = require('./public/assets/js/clog'); // Assuming clog.js is defined correctly
const api = require('./public/assets/Routes/index.js'); // Assuming correct path to index.js
const { readFromFile, readAndAppend } = require('./db/fsUtils.js'); // Assuming fsUtils.js is defined correctly
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Custom middleware (assuming clog.js is defined correctly)
app.use(clog);

// API routes (assuming index.js is defined correctly)
app.use('/api', api);

// Route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Route to serve notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// Route to handle POST request to /notes
app.post('/notes', (req, res) => {
    let response;
  
    // Check if there is anything in the response body
    if (req.body) {
        response = {
            status: 'success',
            data: req.body,
        };
        res.json(response); // Send the response object
    } else {
        res.status(400).json('Request body must at least contain a product name');
    }
  
    // Log the response body to the console (optional)
    // console.log(response.data);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});

module.exports = app;

