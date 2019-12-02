'use strict';
const express = require('express');
const app  = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('uploads'));

const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');

app.use('/user', userRoute);
app.use('/post', postRoute);


app.listen(port);