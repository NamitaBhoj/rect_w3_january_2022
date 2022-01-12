'use strict'

const path = require('path')

// var http = require('http')

// http.createServer(function (req, res) {
//     res.writeHead(200,{'Content-Type':'text/html'})
//     res.write('<h1>Hello World!</h1>')
//     res.end()
// }).listen(8000)



console.log('server start')

var express=require('express')
var app=express()
app.set('view engine', 'ejs')
app.use(express.static('public_html'))

app.get('/',function(req,res){
res.send("<h1>Hello World</h1>")
}
)
app.listen(8000, function (){
 console.log('Server listening to port 8000, go to http://localhost:8000');
})
app.get('/chair',

    function(req,res){

    let filename = path.join(__dirname,'public_html','chair_response.html')

        res.sendFile(filename)

    }

)

/* POST form processing **********************************************************/
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded())

// Parse JSON bodies (as sent by API clients)
app.use(express.json())

// see /public_html/form_post.html
// display form with http://localhost:8000/form_post.html
app.post('/form_post',
    function (request, response) {
        // get the form inputs from the body of the HTTP request
        console.log(request.body)
        const username = request.body.username
        const password = request.body.password
        console.log('username=' + username + ' password=' + password)
        // process form, validate data …
        if (username === '' || password === '') {
            response.writeHead(400, { 'Content-Type': 'text/html' })
            response.end('missing username or password')
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end('Thanks for submitting the form')
        }
    }
)

app.get('/test-param/:a', function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/html'})
    response.end('<h1>' + request.params.a + '</h1>')
});

app.get('/test-param/:a/:b', function (request, response) {
        response.writeHead(200, { 'Content-Type': 'text/html'})
        response.end('<h1>a=' + request.params.a + ' b='+ request.params.b +'</h1>')
    });



// app.get('/products',function(req,res){
// let pageData={}; // initialize empty object
//  pageData.title='Product Catalog-blabla.com';
// pageData.description='Huge selection of products for all your needs-blabla.com';
//    pageData.author='The blabla.com team'
//     let products = [
//         {id:1,name:'white shoes',price:'99.99'},
//         {id:2,name:'black shoes',price:'69.99'},
//         {id:3,name:'blue shoes',price:'79.99'}
//     ]; //typically would come from a database query
//     pageData.content='<table>';
//     for(let i=0;i<products.length;i++){
//         pageData.content+='<tr><td>'+products[i].id+'</td>'
//         pageData.content+='<td>'+products[i].name+'</td>'
//         pageData.content+='<td>'+products[i].price+'</td>'
//         pageData.content+='</tr>'
//     }
//     pageData.content+='</table>';
//     res.render('master_template',pageData)
// });

app.get('/seasons',function(req,res){
    let pageData={}; // initialize empty object
    pageData.title='Home';
    pageData.description='all seasons';
    pageData.author='The blabla.com team'


    // let nav = [
    //     {name:'home'},
    //     {name:'summer'},
    //     {name:'fall'}
    //     ];

    //  pageData.content ='<ul>';
    //     for(let i=0;i<nav.length;i++){
    //     pageData.content+='<li><a href = "#home">'+nav[i].name+'</a></li>'
    //     }
    // pageData.content ='</ul>';

    let seasons = [
    {id:1,name:'winter'},
    {id:2,name:'summer'},
    {id:3,name:'fall'}
    ]; //typically would come from a database query

    pageData.content='<table>';
    for(let i=0;i<seasons.length;i++){
    pageData.content+='<tr><td>'+seasons[i].id+'</td>'
    pageData.content+='<td>'+seasons[i].name+'</td>'
    pageData.content+='</tr>'
    }
    pageData.content+='</table>';

    res.render('master_template',pageData)
    });

    const { Client } = require('pg')

    const DB = new Client({
        host: 'localhost',
        port: 5432,
        database: 'classicModel',
        user: 'postgres',
        password: 'postgres'
    })

    DB.connect((error) => {
        if (error) {
            console.log('ERROR: could not connect to database: ', error.stack)
        } else {
            console.log('OK connected to database')
            // execute query
        }
    })

    DB.query('SELECT * FROM customers', (error, result) => {

        if (error) {
            //display error
            console.log("ERROR in database query: "+error.stack)
        }else{
            console.log(result) // the whole thing: all records + all info
            console.log("Number of records returned:"+result.rowCount)
            console.log(result.rows) // only the actual records returned, all records
            console.log(result.rows[0]) // first record only
            console.log(result.fields) // the table column metadatas
        }
    })