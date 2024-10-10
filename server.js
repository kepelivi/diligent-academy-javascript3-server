const fs = require('fs');
const prompt = require('prompt-sync')();
const express = require('express');

//JSON.parse(fs.readFileSync('data.json', 'utf8'));
//const content = prompt();
//fs.writeFileSync('data.json', JSON.stringify(content, null, 1));

const app = express();
const port = 3000;
app.use(express.json());

const users = [
    {id: 1, name: "Gugu Miau"},
    {id: 2, name: "Gaga Meow"},
    {id: 3, name: "Gaga Nyau"},
]

const products = [
    {id: 1, name: "Pen"},
    {id: 2, name: "Pineapple"}
]

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/filterUsersName', (req, res) => {
    const name = req.query.name;

    res.json(users.filter(user => user.name.toLowerCase().includes(name.toLowerCase())));
});

app.post('/addUser', (req, res) => {
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);

    res.status(201).json(newUser);
})
app.put('/updateUser/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    const userIndex = users.findIndex(user => user.id === parseInt(id));

    if (userIndex !== - 1) {
        users[userIndex] = {...users[userIndex], ...updatedUser};
        res.json(users);
    } else {
        res.status(404).json({ message: "User not found" });
    }
})

app.delete('/deleteUser/:id', (req, res) => {
    const { id } = req.params;

    const userIndex = users.findIndex(u => u.id === parseInt(id));

    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.json({ message: "User deleted" });
    } else {
        res.status(404).json({ message: "User not found"});
    }
})

app.get('/products', (req, res) => {
    res.json(products);
});

app.listen(port, () => {
    console.log("Server listening on port", port);
})