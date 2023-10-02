const express = require('express');
require('dotenv').config();
require('./dbConnection');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const shopitems = require('./routes/shopitems');
const users = require('./routes/users');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use(cookieParser())
app.use('/api/shopitems', shopitems);
app.use('/api/users', users);



const port = process.env.PORT || 5000;

app.listen(port, (err) =>{
    if(err){
        console.log(err);
        return ;
    }
    console.log(`Listening on port ${port}`);
})