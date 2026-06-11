const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware for parsing JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// In-memory tasks array
let tasks = [
  { name: "Laundry", description: "Do the laundry this weekend" },
  { name: "Assignment", description: "Finish assignment by Friday" },
  { name: "Call family", description: "Call family Sunday morning" },
  { name: "Pay bills", description: "Pay the electricity and water bill" }
];

// Serve the swagger configuration file
app.get('/swaggerfile_8', (req, res) => {
  res.sendFile(path.join(__dirname, 'swagger_config.json'));
});

// Home route
app.get('/', (req, res) => {
  res.json({ home: "tasks" });
});

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json({ tasks });
});

// Add a new task
app.post('/task', (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).send("Missing name or description");
  }
  const task = { name, description };
  tasks.push(task);
  res.send("Task Successfully added to the list");
});

// Get a task by name
app.get('/task/:name', (req, res) => {
  const { name } = req.params;
  const filteredTask = tasks.filter(task => task.name === name);
  if (filteredTask.length === 0) {
    res.send("No such task found");
  } else {
    res.json(filteredTask);
  }
});

// Delete a task by name
app.delete('/task/:name', (req, res) => {
  const { name } = req.params;
  const index = tasks.findIndex(task => task.name === name);
  if (index !== -1) {
    tasks.splice(index, 1);
    res.send("Task deleted");
  } else {
    res.send("No such task found");
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    code: err.status || 500,
    name: err.name,
    description: err.message,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
 
