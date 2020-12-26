const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const {Book} = require('./models/Book')

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI,
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

    book.save()
        .then(() => {
            console.log("New Book Created")
            res.send("New Book Created")
        }).catch((err) => {
        if (err) {
            throw  err;
        }
    })
});

app.get("/book/:id", (req, res) => {
    Book.findById(req.params.id)
        .then((book) => {
            if (book) {
                res.json(book);
            } else {
                res.sendStatus(404);
            }
        }).catch((err) => {
        throw err
    })
})

app.delete('/book/:id', ((req, res) => {
    Book.findOneAndDelete(req.params.id)
        .then(() => {
            res.send("Book Deleted")
        })
        .catch(err => {
            throw err
        })
}))

app.listen(4000, () => {
    console.log("Up & Running! Books Microservice");
});
