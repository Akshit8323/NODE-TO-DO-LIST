const express = require("express");
const app = express();
const port = 1008;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let tasks = [];

app.get("/", (req, res) => {
    res.render("index", { tasks });
});

app.post("/addTask", (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        task: req.body.task,
        time: req.body.time
    };
    tasks.push(newTask);
    res.redirect("/");
});

app.get("/deleteTask", (req, res) => {
    const taskId = parseInt(req.query.id);
    tasks = tasks.filter((task) => task.id !== taskId);
    res.redirect("/");
});

app.get("/editTask/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find((t) => t.id === taskId);
    res.render("edit", { task });
});

app.post("/updateTask", (req, res) => {
    const updatedTask = tasks.find((t) => t.id === parseInt(req.body.id));
    updatedTask.task = req.body.task;
    updatedTask.time = req.body.time;
    res.redirect("/");
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is running on:${port}`);
    }
});
