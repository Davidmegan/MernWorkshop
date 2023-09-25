const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const port = 3000;

function getNotes() {
    const data = fs.readFileSync('notes.json','utf-8');
    return JSON.parse(data);
}

function saveNotes(data) {
    return fs.writeFileSync('notes.json',JSON.stringify(data));
}

app.get('/',(req,res)=>{
    return res.send(__dirname+"/index.html");
})

app.get('/notes',(req,res)=>{
    let notes = getNotes();
    return res.send(notes);
})

app.get('/notes/:id',(req,res)=>{
    let id =req.params.id;
    let notes = getNotes();
    for(let i = 0; i<notes.length;i++){
        if(notes[i].id==id){
            return res.send(notes[i]);
        }
    }
    return res.status(404).send(`Note with id ${id} not found`);
})

app.post('/notes',(req,res)=>{
    let {title, description} = req.body;
    if(!title || !description){
        res.status(404).send("Pls enter both title and description")
    }
    let notes = getNotes()
    let newNote = {
        id: notes.length + 1,
        title,
        description
    }
    notes.push(newNote)
    saveNotes(notes)
    return res.send(newNote)
})

app.put('/notes/:id',(req,res)=>{
    let id = req.params.id;
    let {title, description} = req.body;
    if (!title || !description){
        res.status(400).send("Pls enter both title and description");
    }
    let notes = getNotes();
    for(let i = 0; i<notes.length; i++){
        if(notes[i].id==id){
            notes[i].title = title;
            notes[i].description = description;
            saveNotes(notes);
            return res.send(notes[i]);
        }
    }
    return res.status(404).send(`Note with id ${id} not found`);
})

app.delete('/notes/:id',(req,res)=>{
    let id = req.params.id;
    let notes = getNotes();
    for (var i = 0; i<notes.length; i++){
        if(notes[i].id==id){
            notes.splice(i,1);
            saveNotes(notes);
            return res.send(notes);
        }
    }
    return res.status(404).send(`Note with id ${id} not found`);
})

app.use((req,res)=>{
    return res.status(404).send("Not found");
})


app.listen(port,(req,res)=>{
    console.log(`Server running on port: ${port}`);
})


app.listen(3030,(req,res)=>{
    console.log("Server started")
})