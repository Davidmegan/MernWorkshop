//import express

const express = require('express');

//create express app

const app = express();

//use express.json() middleware

app.use(express.json());

//create a sample todo list array

const todoList = [
    {
        id: 1,
        title: 'Learn Node.js',
        completed: "false"
    },
    {
        id: 2,
        title: 'Learn Express',
        completed: "false"
    },
    {
        id: 3,
        title: 'Learn MongoDB',
        completed: "false"
    }
];

//create a GET route to fetch all todos

app.get('/todos', (req, res) => {
    return res.send(todoList)
});

//create a GET route to fetch a single todo

app.get('/todo/:id',(req,res)=>{
    let id = req.params.id
    for( let i=0;i<todoList.length;i++){
        if(todoList[i].id==id){
            return res.send(todoList[i])
        }
    }
    return res.status(404).send(`No todo found with id: ${id}`)
})

//create a POST route to add a new todo

app.post('/todo',(req,res)=>{
    let {title, completed} = req.body
    if(!title || !completed){
        return res.status(400).send("Enter both title and completed")
    }
    let todo = {
        id: todoList.length + 1,
        title,
        completed
    }
    todoList.push(todo)
    return res.send(todo)
})

//create a PUT route to update a todo

app.put('/todo/id',(req,res)=>{
    let id = req.params.id
    let {title, completed} = req.body
    if(!title || !completed){
        return res.status(400).send("Enter both title and completed")
    }
    for(let i=0;i<todoList.length;i++){
        if(todoList[i].id==id){
            todoList[i].title = title
            todoList[i].completed = completed
            return res.send(todoList[i])
        }
    }
    res.status(404).send(`No todo with id: ${id} is found`)
})

//create a DELETE route to delete a todo

app.delete('/todo/:id',(req,res)=>{
    let id = req.params.id
    for(let i=0;i<todoList.length;i++){
        if(todoList[i].id==id){
            todoList.splice(i,1)
            return res.send(todoList)
        }
    }
    res.status(404).send(`No todo with id: ${id} is found`)
})

// create a PATCH/PUT route to update a todo status

app.patch('/todo/:id',(req,res)=>{
    let id = req.params.id
    let {completed} = req.body
    for(let i=0;i<todoList.length;i++){
        if(todoList[i].id==id){
            todoList[i].completed=completed
            return res.send(todoList[i])
        }
    }
    res.status(404).send(`No todo with id: ${id} is found`)
})

// create a fallback route for all other routes.

app.use((req,res)=>{
    res.status(400).send("Not Found")
})
//listen on port 3000

app.listen(3000, (req,res) => {
    console.log("Server is running on port 3000");
});
