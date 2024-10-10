const fs = require('fs');
const prompt = require('prompt-sync')();
const express = require('express');

const app = express();
const port = 3000;
app.use(express.json());

const todos = JSON.parse(fs.readFileSync('data.json', 'utf8'));

app.get('/todos', (req, res) => {
    if (todos) {
        res.json(todos);
    } else {
        res.status(404).json({ message: "There are no todos" });
    }
})

app.post('/addTodo', (req, res) => {
    const newTodo = req.body;

    newTodo.id = todos.length + 1;

    try {
        fs.writeFileSync('data.json', JSON.stringify([...todos, newTodo]), 'utf8');
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ message: `Something went wrong... ${err}` })
    }
})

app.put('/updateTodo/:id', (req, res) => {
    const { id } = req.params;
    const updatedTodo = req.body;

    const todoIndex = todos.findIndex(td => td.id === parseInt(id));

    if (todoIndex !== -1) {
        try {
            todos[todoIndex] = { ...todos[todoIndex], updatedTodo };
            fs.writeFileSync('data.json', JSON.stringify([...todos]), 'utf8');
            res.json(todos);
        } catch (err) {
            res.status(500).json({ message: `Something went wrong... ${err}` })
        }
    } else {
        res.status(404).json({ message: "Todo not found" });
    }
})

app.delete('/deleteTodo/:id', (req, res) => {
    const { id } = req.params;

    const todoIndex = todos.findIndex(td => td.id === parseInt(id));

    if (todoIndex !== -1) {
        try {
            const filteredTodos = todos.filter(td => td.id !== parseInt(id));
            fs.writeFileSync('data.json', JSON.stringify(filteredTodos), 'utf8');
            res.json(filteredTodos);
        } catch (err) {
            res.status(500).json({ message: `Something went wrong... ${err}` })
        }
    } else {
        res.status(404).json({ message: "Todo not found" });
    }
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})