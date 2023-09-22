//console.log("I'm your friendly neighbourhood - Spiderman")

const express = require('express');

const app = express();  //semicolon optional
//CRUD - create, read, update, delete => post, get, put, delete
app.get('/',firstRoute)
app.get('/second',secondRoute)  //if 1st arg is '/' which is same as 1st node.js takes it same as 1st fn 
app.get('/third',thirdRoute)
app.get('/dynamic/:id',(req,res) => {
    const id = req.params.id;
    res.send("Dynamic Route "+id);
})
app.get('/notes',(req,res) => {
    res.send(NOTES);
})
app.get('/notes/:id',(req,res) => {
    const id = req.params.id;
    for (let i = 0; i < NOTES.length; i++){
        if(NOTES[i].id==id){
            res.send(NOTES[i]);
        }
    }
    res.send("NOTES not found");
})

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
        "name" : "Tokyo Revengers",
        "description" : "fav - Baji Keisuke"
    },
    {
        "id" : 3,
        "name" : "Death note",
        "description" : "fav - L"
    }
]

function printMessage(){
    console.log("Server is runnning on port 3000")
}