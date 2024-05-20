const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile  } = require('../../../db/fsUtils');
const uuid = require('../../../db/uuid');



notes.get('/', (req, res) => {
    readFromFile('./db/notes.json').then((data) =>res.json(JSON.parse(data)));
});

notes.post('/', (req,res) => {
const { title, text} = req.body;
if(req.body!=undefined){
    const Note={
        title,
        text,
        id: uuid()
    };
    readAndAppend(Note,'./db/notes.json');
   
}
});

notes.delete(`/:id`,(req,res) => {
    const {id}=req.params;
readFromFile('./db/notes.json','utf8').then((data) =>{
    let notepad=[];
    notepad= JSON.parse(data);
    //console.log(`delete the note with the id of ${id}`);
    let editedNotepad= notepad.filter( (word)=>word.id != id);
    //console.log(editedNotepad);
    writeToFile('./db/notes.json',editedNotepad);
  
    });
  });


module.exports=notes;