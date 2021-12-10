const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose')

// Put here your database name to create new data base or put existing data base name <name_demo> = Aman_Kumar
mongoose.connect("mongodb+srv://user-open-to-all:hiPassword123@cluster0.xgk0k.mongodb.net/ARTI_DHOLE-DB?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => console.log('mongodb running and connected'))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});