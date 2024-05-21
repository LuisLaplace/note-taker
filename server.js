const express = require('express');
const path = require('path');
const { clog } = require('./public/assets/js/clog');
const api = require('./public/assets/Routes/index.js')
const savedNotes= require('./db/saveNotes');
const { title } = require('process');
const { readFromFile, readAndAppend } = require('./db/fsUtils.js');
const PORT = process.env.PORT||3001;

const app = express();

// Middleware for parsing application/json and urlencoded data

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',api);

app.use(clog);
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/'));
});

app.get('/notes',(req,res) =>{
    res.sendFile(path.join(__dirname,'./public/notes.html'))

});

app.post('/notes', (req, res) => {
    let response;
  
    // Check if there is anything in the response body
    if (req.body!= undefined) {
      response = {
        status: 'success',
        data: req.body,
      };
      res.json(`The post succesfully was completed`);
    } else {
      res.json('Request body must at least contain a product name');
    }
  
    // Log the response body to the console
    //console.log(response.data);
});

app.listen(PORT, () => {
         console.log(`Example app listening at http://localhost:${PORT}`);
});
    
module.exports = app;

