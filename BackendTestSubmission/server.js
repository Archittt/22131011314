const express = require('express');
const mongoose = require('mongoose');
const shorturlRoutes = require('./routes/shorturl');
const logger = require('./middleware/logger');

const app = express();
app.use(express.json());
app.use(logger); // Custom logger

app.use('/', shorturlRoutes);

mongoose.connect('mongodb://localhost:27017/urlshortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => {
        console.log('Server running on http://localhost:3000');
    });
});