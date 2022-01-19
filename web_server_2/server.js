'use strict'

// const express = require('express')
// const app = express()
// const cors= require('cors')
// app.use(cors())

const tableInFile = require('./src/tableinfile')
const fileName = 'users.json'

app.get('/users', function(req, res){
const users = tableInFile.getTable(fileName)

if(Object.keys(users).length != 0)
{
const usersString = JSON.stringify(users)
res.statusMessage = 'all ok!'
res.writeHead(200, {'content-Type' : 'application/json'})
res.end(usersString)
}else{
    res.statusMessage = 'not found!'
    res.writeHead(404, {'content-Type' : 'application/json'})
    res.end(usersString)}
});

// // app.get('/users/:id', function(req, res){
// //     const user = tableInFile.getRec(fileName, Number(req.params.id))
// //     if(Object.keys(user).length != 0)
// // {
// //     const usersString = JSON.stringify(user)
// //     res.statusMessage = 'all ok!'
// //     res.writeHead(200, {'content-Type' : 'application/json'})
// //     res.end(usersString)}
// // else{
// //     res.statusMessage = 'not found!'
// //     res.writeHead(404, {'content-Type' : 'application/json'})
// //     res.end()}
// // });

// app.use(express.urlencoded)
// app.use(express.json())

// var bodyParser = require('body-parser');
// app.use(bodyParser.json()); // to support JSON-encoded bodies
// app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

// app.post('/users',function(req, res){
//     if(tableInFile.addRec(fileName, req.body)){
//         res.statusMessage = 'all ok!'
//         res.writeHead(200, {'content-Type' :  'text/html'})
//         res.end(usersString)}
//     else{
//         res.statusMessage = 'not found!'
//         res.writeHead(401, {'content-Type' :  'text/html'})
//         res.end()}
//     });

// app.put('/user/:id',function(req, res){

// })

// app.delete('/user/:id',function(req, res){

// })

// app.listen(8000, function(){
//     console.log('port 8000')
// })

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/routes.js')(app, fs);

const server = app.listen(3001, () => {
    console.log('listening on port %s...', server.address().port);
  });

// const tableInFile = require('./src/tableinfile')

// const fileName = 'users.json'