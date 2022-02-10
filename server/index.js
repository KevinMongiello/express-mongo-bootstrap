const express = require('express');
const app = express();
const auth = require('./routes/auth');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(
    process.env.MONGO_URI,
    () => console.log('success connecting to mongo db')
);


// Configure Env
require('dotenv').config();
const PORT = process.env.PORT;


app.use(bodyParser.json());
app.use('/api/user', auth);

app.listen(PORT, () => console.log('App running on ' + PORT));