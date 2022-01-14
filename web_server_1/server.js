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

// app.get('/seasons',function(req,res){
//     const pageData={}; // initialize empty object
//     pageData.title='Home';
//     pageData.description='all seasons';
//     pageData.author='The blabla.com team'
//     const seasons = [
//         { id: 1, name: 'Winter' },
//         { id: 2, name: 'Spring' },
//         { id: 3, name: 'Summer' },
//         { id: 4, name: 'Fall' }
//     ]
//     pageData.content = '<table>'
//     for (let i = 0; i < seasons.length; i++) {
//         pageData.content += '<tr><td>' + seasons[i].name + '</tr></td>'
//     }
//     pageData.content += '</table>'
//     res.render('master_template', pageData)
// })

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

    // DB.query('SELECT * FROM customers', (error, result) => {

    //     if (error) {
    //         //display error
    //         console.log("ERROR in database query: "+error.stack)
    //     }else{
    //         console.log(result) // the whole thing: all records + all info
    //         console.log("Number of records returned:"+result.rowCount)
    //         console.log(result.rows) // only the actual records returned, all records
    //         console.log(result.rows[0]) // first record only
    //         console.log(result.fields) // the table column metadatas
    //     }
    // })

    // List all customers
app.get('/customers_list', function (request, response) {
    const DB = require('./src/dao')
    DB.connect()
    DB.query('SELECT * from customers', function (customers) {
        let html = ''
        html += 'Number of customers: ' + customers.rowCount + '<br>'
        html += '<table>'
        for (let i = 0; i < customers.rowCount; i++) {
            html += '<tr><td>' + customers.rows[i].customernumber + '</td><td>' + customers.rows[i].customername + '</td></tr>'
        }
        html += '</table>'

        // use the page template of course to display the list
        const pageData = {} // initialize empty object
        pageData.title = 'Customers List-blabla.com'
        pageData.description = 'Customers Number and Name'
        pageData.author = 'The blabla.com team'
        // send out the html table
        pageData.content = html
        response.render('master_template', pageData)
        DB.disconnect()
    })
})

/* POST form processing **********************************************************/
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded())

// Parse JSON bodies (as sent by API clients)
app.use(express.json())

// see /public_html/form_post.html
// display form with http://localhost:8000/form_post.html
app.post('/customer_search_form',
    function (request, response) {
        // get the form inputs from the body of the HTTP request
        console.log(request.body)
        const userNumber = request.body.number
        console.log('username=' + userNumber)

        const DB = require('./src/dao')

        DB.connect()

        DB.query('SELECT * from customers where customernumber = ' + userNumber, function (customers) {
        let html = ''
        html += 'Number of customers: ' + customers.rowCount + '<br>'
        if ( customers.rowCount == 0) {
            response.writeHead(400, { 'Content-Type': 'text/html' })
            response.end('can not find user')
        }else{
        html += '<table>'
        for (let i = 0; i < customers.rowCount; i++) {
            html += '<tr><td>' + customers.rows[i].customernumber + '</td><td>' + customers.rows[i].customername + '</td></tr>'
        }
        html += '</table>'}

        // use the page template of course to display the list
        const pageData = {} // initialize empty object
        pageData.title = 'Customers List-blabla.com'
        pageData.description = 'Customers Number and Name'
        pageData.author = 'The blabla.com team'
        // send out the html table
        pageData.content = html
        response.render('master_template', pageData)
        DB.disconnect()
    })
    }
)

// for AJAX tests, returns the list of customers in a JSON string
app.get('/customers', function (request, response) {
    let DB = require('./src/dao');
    DB.connect();
    DB.query('SELECT * from customers',function (customers){
        const customersJSON={customers:customers.rows}
        const customersJSONString = JSON.stringify(customersJSON, null, 4)
        // set content type
        response.writeHead(200, { 'Content-Type': 'application/json'})
       // send out a string
        response.end(customersJSONString)
    })
});

// delete one customer
// note you cannot delete customers with orders
// to know customers that don't have an order run this query
// SELECT * from customers
// LEFT JOIN orders on customers.customernumber = orders.customernumber
// WHERE ordernumber IS NULL
// ORDER BY customers.customernumber ASC
// result: you can delete customernumber 477,480,481 and others
app.delete('/customers/:id', function (request, response) {
    let id=request.params.id // read the :id value send in the URL
    let DB = require('./src/dao');
    DB.connect();
    DB.queryParams('DELETE from customers WHERE customernumber=$1',[id],function (customers){
        response.writeHead(200, { 'Content-Type': 'text/html'})
       // send out a string
        response.end("OK customer deleted")
    })
});