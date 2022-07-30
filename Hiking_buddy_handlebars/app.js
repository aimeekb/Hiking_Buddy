// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json());
app.use(express.urlencoded({extended: true}));
PORT        = 54751;                 // Set a port number at the top so it's easy to change in the future
// Database
var db = require('./database/db-connector');

// handlebars setup
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/

app.get('/', function(req, res)                 
    {
        res.render('index');                   
    });  
    
app.get('/users', function(req, res)
    {  
        let query1 = "SELECT id_user, first_name, last_name, email, user_location, user_dist_total FROM Users;"; 
        

        db.pool.query(query1, function(error, rows, fields){    

            res.render('users', {data: rows});                  
        })                                                      
    });  


app.post('/add-user-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = 
        `INSERT INTO Users (
            first_name, 
            last_name,
            email, 
            user_location, 
            user_dist_total  
        ) VALUES (
            '${data['input-first_name']}',
            '${data['input-last_name']}',
            '${data['input-email']}',
            '${data['input-input-user_location']}',
            0               
        );`;

    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/');
        }
    })
});








app.get('/trails', function(req, res)                 
    {
        res.render('trails');                   
    });  

app.get('/trail_types', function(req, res)                 
    {
        res.render('trail_types');                   
    });  

app.get('/inventory_items', function(req, res)                 
    {
        res.render('inventory_items');                   
    }); 

app.get('/packing_lists', function(req, res)                 
    {
        res.render('packing_lists');                   
    }); 

app.get('/packing_list_details', function(req, res)                 
    {
        res.render('packing_lists');                   
    }); 

app.get('/hikes', function(req, res)                 
    {
        res.render('hikes');                   
    }); 

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});