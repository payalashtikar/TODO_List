const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    taskname: {
        type: String,
        required: true,
    }
})

mongoose.model("Task", taskSchema)