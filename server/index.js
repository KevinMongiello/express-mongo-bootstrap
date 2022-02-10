const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// Routes
const auth = require('./routes/auth');
const postRoutes = require('./routes/posts');

mongoose.connect(
    process.env.MONGO_URI,
    () => console.log('success connecting to mongo db')
);


// Configure Env
require('dotenv').config();
const PORT = process.env.PORT;


app.use(bodyParser.json());
app.use('/api/user', auth);
app.use('/api/posts', postRoutes);

app.listen(PORT, () => console.log('App running on ' + PORT));