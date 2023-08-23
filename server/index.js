const express = require('express')
const app =express()
const mongoose = require('mongoose')
const {DB} = require("./key")
const cors= require('cors')
require('./model/tasks')

const port = 8080


const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose
    .connect(DB, connectionParams)
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch((err) => {
        console.log("DB connection failed", err);
    });

app.use(express.json());

//routes
app.use(cors());
app.use(require('./routes/task'))



app.listen(port, () => {
    console.log(`server running at ${port}`)
})