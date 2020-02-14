


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const db = require('./querys');


app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
    extended: true,
 })
);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
  });

app.get('/api/users/:user_id', db.getUsersid)

app.get('/api/users', db.getUsers);

app.post('/api/users', db.createUser);

app.put('/api/users/:user_id', db.updateUser);

app.delete('/api/users/:user_id', db.deleteUser); 


app.listen(PORT, ()=> {
    console.log(`server in port ${PORT}`)
});

