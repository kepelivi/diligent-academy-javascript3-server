fetch('http://localhost:3000/filterUsersName?name=Miau')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));

fetch('http://localhost:3000/addUser', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: "Gágá Woof" })
})
    .then(res => res.json())
    .then(data => console.log("New user added: ", data))
    .catch(err => console.error(err));


const id = 1;

fetch(`http://localhost:3000/updateUser/${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: "Gugu Miau Mau" })
})
    .then(res => res.json())
    .then(data => console.log("Users updated: ", data))
    .catch(err => console.error(err));

fetch(`http://localhost:3000/deleteUser/2`, {
    method: 'DELETE'
})
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));