const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const {Book} = require('./models/Book')

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://books_user:books_password@cluster0.cbckc.mongodb.net/books>?retryWrites=true&w=majority",
    {useUnifiedTopology: true}, () => {
        console.log("DB Is Connected");
    })

app.get('/', (req, res) => {
    res.send("Hello From Books Microservice");
});

app.get('/books', (req, res) => {

    Book.find().then((books) => {
        res.json(books)
    }).catch((err) => {
        throw err
    })
})


app.post('/books', (req, res) => {
    const newBook = {
        title: req.body.title,
        author: req.body.author,
        numberOfPages: req.body.numberOfPages,
        publisher: req.body.publisher
    }

    const book = new Book(newBook);

    book.save().then(() => {
        console.log("New Book Created")
        res.send("New Book Created")
    }).catch((err) => {
        if (err) {
            throw  err;
        }
    })
});

app.get("/book/:id", (req, res) => {
    Book.findById(req.params.id).then((book) => {
        res.json(book);
    }).catch((err) => {
        throw err
    })
})

app.listen(4000, () => {
    console.log("Up & Running! Books Microservice");
});
