const express = require('express');
const server = express();

const hostname = '0.0.0.0';
const port = 3000;

const mongoose = require('mongoose');

// Without Docker
// To start a localhost mongodb session, open mongod.exe at D:/Logiciels/MongoDB/Server/4.2/bin/
mongoose.connect('mongodb://localhost:27017/apinodejs', {useNewUrlParser: true, useUnifiedTopology: true});
const dbConnection = mongoose.connection;

dbConnection.once("open", () => {
    console.log("Db connection is ok.");
});

const bodyParser = require('body-parser');
// server.use(cors());
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());

const postRoute = require('./api/routes/postRoute');
postRoute(server);

const commentRoute = require('./api/routes/commentRoute');
commentRoute(server);

const userRoute = require('./api/routes/userRoute');
userRoute(server);

server.listen(port, hostname);

