const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

// App
const app = express();

// Config
require('dotenv').config();
mongoose.connect(
    process.env.MONGO_URI,
    () => console.log('success connecting to mongo db')
);
    
// CSRF
const csrfProtection = csrf({ cookie: true });

// Logging
app.use(morgan("dev"));
    
// Routes
const auth = require('./routes/auth');
const postRoutes = require('./routes/posts');
const csrfRoutes = require('./routes/csrfToken');

// Configure Env
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(csrfProtection);
app.use(cors({
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use('/api/user', auth);
app.use('/api/posts', postRoutes);
app.use(csrfRoutes);

app.listen(PORT, () => console.log('App running on ' + PORT));