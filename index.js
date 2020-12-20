const express = require('express')
const mongoose = require("mongoose")


const app = express();

mongoose.connect("mongodb+srv://books_user:books_password@cluster0.cbckc.mongodb.net/<dbname>?retryWrites=true&w=majority",
    {useUnifiedTopology: true}, () => {
        console.log("DB Is Connected");
    })

app.get('/', (req, res) => {
    res.send("Hello From Books Microservice");
});


app.listen(4000, () => {
    console.log("Up & Running! Books Microservice");
});
