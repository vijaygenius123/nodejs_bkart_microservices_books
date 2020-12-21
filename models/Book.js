const mongoose = require('mongoose');

const Book =  mongoose.model("Book", {
    // Title, Author, numberOfPages, Publisher

    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    numberOfPages: {
        type: Number,
        required: false,
    },
    publisher: {
        type: String,
        required: false,
    }
})

module.exports = {Book}
