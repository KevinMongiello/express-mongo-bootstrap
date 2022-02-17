const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Logging
app.use(morgan("dev"));

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

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api/user', auth);
app.use('/api/posts', postRoutes);

app.listen(PORT, () => console.log('App running on ' + PORT));