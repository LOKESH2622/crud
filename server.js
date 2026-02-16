const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// In-memory database (for demo)let tasks = [];
let idCounter = 1;

/* ------------------ CRUD ROUTES ------------------ */

// CREATE
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: idCounter++,
    title,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// READ ALL
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// READ ONE
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

// UPDATE
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  task.title = req.body.title || task.title;

  res.json(task);
});

// DELETE
app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.json({ message: "Deleted successfully" });
});
app.get("/", (req, res) => {
  res.send("Welcome to the Task 1  !");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
