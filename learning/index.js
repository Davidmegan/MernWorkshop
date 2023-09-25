//console.log("I'm your friendly neighbourhood - Spiderman")

const express = require('express');

const app = express();  //semicolon optional
//CRUD - create, read, update, delete => post, get, put, delete
app.use(express.json()) // parses input to json type

app.get('/',firstRoute)
app.get('/second',secondRoute)  //if 1st arg is '/' which is same as 1st node.js takes it same as 1st fn 
app.get('/third',thirdRoute)
app.get('/dynamic/:id',(req,res) => {
    const id = req.params.id;
    return res.send("Dynamic Route "+id);
})
app.get('/notes',(req,res) => {
    res.send(NOTES);
})
app.get('/notes/:id',(req,res) => {
    const id = req.params.id;
    for (let i = 0; i < NOTES.length; i++){
        if(NOTES[i].id==id){
            return res.send(NOTES[i]);
        }
    }
    return res.send("NOTES with id ${id} not found");
})

app.post('/notes', (req, res) => {
    const {title, description} = req.body;
    const id = NOTES.length + 1;
    const newNote = {
        "id":id,
        "title":title,
        "description":description
    }
    NOTES.push(newNote);
    res.send(newNote);
});

app.put('/notes/:noteId', (req, res) => {
    const id = req.params.noteId;
    const {title, description} = req.body;
    for(let i=0; i<NOTES.length; i++){
        if(NOTES[i].id == id){
            NOTES[i].title = title;
            NOTES[i].description = description;
            return res.send(NOTES[i]);
        }
    }
    return res.send(`Note with id ${id} not found`);
    }
    );

app.delete('/notes/:noteId', (req, res) => {
    const id = req.params.noteId;
    for(let i=0; i<NOTES.length; i++){
        if(NOTES[i].id == id){
            NOTES.splice(i, 1);
            return res.send(`Note with id ${id} deleted`);
        }
    }
    return res.send(`Note with id ${id} not found`);
    }
    );


/*
function dynamicRoute(req,res){
    const id = req.params.id;
    res.send("Dynamic Route "+ id);
}
*/

/*
for (let i = 0; i < NOTES.length; i++){
        res.send(`${NOTES[i]}`);
    }
*/

function firstRoute(req,res) {
    res.send("Oi..oi..oi.. I'm your friendly neighbourhood Spiderman...");
}

function secondRoute(req,res){
    res.send("Shinzou Sasageyo");
    res.send("send 2 test"); // doesn't work
}

function thirdRoute(req,res){
    res.send("Hehe.. yowaaimou");
}

app.listen(3000,printMessage)

const NOTES = [
    {
        "id" : 1,
        "title" : "Haikyuu",
        "description" : "fav - Nishinoya"
    },
    {
        "id" : 2,
        "title" : "Tokyo Revengers",
        "description" : "fav - Baji Keisuke"
    },
    {
        "id" : 3,
        "title" : "Death note",
        "description" : "fav - L"
    }
]

function printMessage(){
    console.log("Server is runnning on port 3000")
}

//json - javascript object notation