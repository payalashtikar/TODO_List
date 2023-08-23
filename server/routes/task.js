const mongoose = require("mongoose")
const express = require("express")
const Tasks = mongoose.model("Task")
const router = express.Router()

router.post('/createtask', async (req, res) => {
    try {
        const { taskname } = req.body;
        if (!taskname) {
            return res.status(400).json({ error: "please add your task" });
        }
        const addTask = new Tasks({ taskname });
        await addTask.save();
        return res.status(200).json({ message: "Task added", task: addTask }); // Changed 'addTask' to 'task'
    } catch (error) {
        return res.status(400).json({ error: error.message }); // Changed 'error' to 'error.message'
    }
});

router.get('/readtask', async (req, res) => {
    try {
        const readtasks = await Tasks.find(); // Remove {taskname} since you're reading all tasks
        return res.status(200).json({ message: "read out all tasks", readtasks });
    } catch (error) {
        // return res.status(400).json({ error: error });
        return res.status(400).json({ error: error.message });

    }
});



router.delete("/deteletask/:id", async (req, res) => {
    let data = await Tasks.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).json({ message: "deleted : ", data });
})

router.put('/edittask/:id', async (req, res) => {
    try {
        const data = await Tasks.findByIdAndUpdate(
            req.params.id, // Use the ID directly
            { taskname: req.body.taskname }, // Update only taskname
            { new: true, runValidators: true }
        );

        if (!data) {
            return res.status(404).json({ error: "Cannot find task" });
        }

        return res.status(200).json({ message: "Task updated" });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});


module.exports = router;