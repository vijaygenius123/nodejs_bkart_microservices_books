const express = require('express')
const app = express();

app.get('/', (req, res) => {
    res.send("Hello From Books Microservice");
});


app.listen(4000, () => {
   console.log("Up & Running! Books Microservice");
});
