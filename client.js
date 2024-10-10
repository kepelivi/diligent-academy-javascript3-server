const prompt = require("prompt-sync")();

fetch("http://localhost:3000/todos")
  .then((res) => res.json())
  .then((data) => console.log("List of Todos: ", data))
  .catch((err) => console.error(err));

const filterName = prompt("Enter the name to filter todos: ");
fetch(`http://localhost:3000/filterTodos?name=${filterName}`)
  .then((res) => res.json())
  .then((data) => console.log("Filtered todos: ", data))
  .catch((err) => console.error(err));

const newTodo = prompt("Enter the new todo: ");
fetch("http://localhost:3000/addTodo", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: newTodo }),
})
  .then((res) => res.json())
  .then((data) => console.log("New todo added: ", data))
  .catch((err) => console.error(err));

const updateId = prompt("Enter the ID of the todo to update: ");
const updateName = prompt("Enter the new name for the todo: ");
fetch(`http://localhost:3000/updateTodo/${updateId}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: updateName }),
})
  .then((res) => res.json())
  .then((data) => console.log("Todo updated: ", data))
  .catch((err) => console.error(err));

const deleteId = prompt("Enter the ID of the todo to delete: ");
fetch(`http://localhost:3000/deleteTodo/${deleteId}`, {
  method: "DELETE",
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
