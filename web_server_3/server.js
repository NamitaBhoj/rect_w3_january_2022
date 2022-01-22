'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const tableInFile = require('./src/tableinfile')
const port = 8000
const cors = require('cors')

app.use(cors())

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', tableInFile.getUsers)
app.get('/users/:id', tableInFile.getUserById)
app.post('/users', tableInFile.createUser)
app.put('/users/:officecode', tableInFile.updateUser)
app.delete('/users/:id', tableInFile.deleteUser)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
