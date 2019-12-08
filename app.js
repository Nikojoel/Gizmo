'use strict';
const express = require('express');
const app  = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({parameterLimit: '11111', limit: '10mb', extended: true}));

app.use('/thumbnails', express.static('thumbnails'));
app.use(express.static('uploads'));

const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const autRoute = require('./routes/authRoute');

app.use('/user', userRoute);
app.use('/post', postRoute);
app.use('/auth', autRoute);


if(process.env.SERVER === 'dev_localhost') {
    console.log('localhost server started.');
    require('./secure/localhost')(app);
} else {
    require('./secure/server')(app);
    app.listen(process.env.PORT, () => {
        console.log('secure server app started.');
    });
}
