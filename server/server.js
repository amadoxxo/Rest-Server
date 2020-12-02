require('./config/config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');


const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.use(require('./routes/usuario'));


mongoose.connect(process.env.URLDB,

    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true },

    (err, res) => {

        if (err) throw err;

        console.log('La base de datos esta en linea');
    });


app.listen(process.env.PORT, () => {
    console.log('Conectandose al puerto', process.env.PORT);
});