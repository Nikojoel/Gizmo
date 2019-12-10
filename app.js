'use strict';
const express = require('express');
const app  = express();
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({parameterLimit: '11111', limit: '10mb', extended: true}));

app.use('/thumbnails', express.static('thumbnails'));
app.use(express.static('uploads'));
app.use(express.static('public'));

const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const autRoute = require('./routes/authRoute');
const adminRoute = require('./routes/adminRoute');


app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/auth', autRoute);
app.use('/admin', adminRoute);


if(process.env.SERVER === 'dev_localhost') {
    console.log('localhost server started.');
    require('./secure/localhost')(app);
} else {
    require('./secure/server')(app);
    app.listen(process.env.PORT, () => {
        console.log('secure server app started.');
    });
}
