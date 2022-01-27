'use strict'

const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.urlencoded())
app.use(express.json())
app.use(express.static('public_html'))

app.get('/', function (req, res) {
    res.writeHead(200) // optional because 200 is the default response code
    res.end('<h1>Welcome to a Music Playlist Manager</h1>')
})

// SELECT ALL - GET
app.get('/tracks', (req, res) => {
    const DB = require('./src/dao')
    DB.connect()
    DB.query('SELECT * from track', function (tracks) {
        if (tracks.rowCount > 0) {
            const officesJSON = { msg: 'OK', tracks: tracks.rows }
            const officesJSONString = JSON.stringify(officesJSON, null, 4)
            // set content type
            res.writeHead(200, { 'Content-Type': 'application/json' })
            // send out a string
            res.end(officesJSONString)
        } else {
            // set content type
            const officesJSON = { msg: 'Table empty, no tracks found' }
            const officesJSONString = JSON.stringify(officesJSON, null, 4)
            res.writeHead(404, { 'Content-Type': 'application/json' })
            // send out a string
            res.end(officesJSONString)
        }

        DB.disconnect()
    })
})

// DELETE
app.delete('/tracks/:id', function (request, response) {
    const id = request.params.id // read the :id value send in the URL
    const DB = require('./src/dao')
    DB.connect()

    DB.queryParams('DELETE from track WHERE id=$1', [id], function (tracks) {
        const officesJSON = { msg: 'OK track deleted' }
        const officesJSONString = JSON.stringify(officesJSON, null, 4)
        // set content type
        response.writeHead(200, { 'Content-Type': 'application/json' })
        // send out a string
        response.end(officesJSONString)
        DB.disconnect()
    })
})

// INSERT - POST
app.post('/tracks', function (request, response) {
    // get the form inputs from the body of the HTTP request
    console.log(request.body)
    const id = request.body.id
    const playlistId = request.body.playlist_id
    const title = request.body.title
    const uri = request.body.uri
    const masterId = request.body.master_id

    const DB = require('./src/dao')
    DB.connect()

    DB.queryParams(
        'INSERT INTO track VALUES ($1,$2,$3,$4,$5)',
        [id, playlistId, title, uri, masterId],
        function (tracks) {
            const officesJSON = { msg: 'OK track added' }
            const officesJSONString = JSON.stringify(officesJSON, null, 4)
            // set content type
            response.writeHead(200, { 'Content-Type': 'application/json' })
            // send out a string
            response.end(officesJSONString)
            DB.disconnect()
        }
    )
})

app.listen(8000, function () {
    console.log('server listening to port 8000')
})
