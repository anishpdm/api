const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');



   // "multer": "^1.4.4",
    // "multer-s3": "^3.0.1",

const app = express();
require('dotenv').config();

const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ extended: false })); 

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
const uri = process.env.ATLAS_URI;
mongoose.connect("mongodb+srv://linkurcodes:logixspace@cluster0.on7id.mongodb.net/LinkUrCodesCodingClub", { useNewUrlParser: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('mongo DB success');
});

const userRouter = require('./routes/users');
app.use('/users', userRouter);


const router = require('./routes/upload.router');
app.use('/test', router);

const collegeRouter = require('./routes/colleges');
app.use('/colleges', collegeRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})