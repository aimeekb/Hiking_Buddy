// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json());
app.use(express.urlencoded({extended: true}));
PORT        = 54752;                 // Set a port number at the top so it's easy to change in the future
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


// USERS ROUTES

app.get('/users', function(req, res)
    {  
        let query1 = "SELECT id_user AS ID, first_name AS First, last_name as Last, email, user_location AS City, user_dist_total AS TotalMiles FROM Users;"; 
        

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
            '${data['input-user_location']}',
            0               
        );`;

    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/users');
        }
    })
});



// TRAILS ROUTES

app.get('/trails', function(req, res)                 
    {
        let query1 = 
        `SELECT \
            id_trail AS ID, \
            trail_name AS Name, \
            trail_location AS Location, \
            Trail_types.trail_type_description AS Type, \
            trail_distance AS Distance \
            FROM Trails INNER JOIN Trail_types \
        ON Trails.id_trail_type = Trail_types.id_trail_type
        ORDER BY id_trail;`;
        
        db.pool.query(query1, function(error, rows, fields){    
            res.render('trails', {data: rows});                  
        })                                                      
    });  
              
app.post('/add-trail-form', function(req, res){

    let data = req.body;
    let type = parseInt(data['input-trail_type']);
    
    // if (isNaN(type))
    // {
    //     type = 'NULL'
    // }

    let distance = parseFloat(data['input-trail_distance']);
    // if (isNaN(distance))
    // {
    //     distance = 'NULL'
    // }

    query1 = 
        `INSERT INTO Trails(
            id_trail_type,
            trail_name,
            trail_location,
            trail_distance
        )VALUES(
            '${data['input-trail_type']}',
            '${data['input-trail_name']}',
            '${data['input-trail_location']}',
            '${distance}'
        );`;

    db.pool.query(query1, function(error, rows, fields){

        if (error) {           
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/trails');
        }
    })
});

app.post('/update-trail-form', function(req, res){

    let data = req.body;
    let ID = parseInt(data['input-id_trail']);
    
    // if (isNaN(type))
    // {
    //     type = 'NULL'
    // }

    let distance = parseFloat(data['input-trail_distance']);

    query1 = 
    `UPDATE Trails SET
        id_trail_type = '${data['input-trail_type']}',
        trail_name = '${data['input-trail_name']}',
        trail_location = '${data['input-trail_location']}',
        trail_distance =  '${distance}'
    WHERE id_trail = '${data['input-id_trail']}';`; 
        
    db.pool.query(query1, function(error, rows, fields){

        if (error) {           
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/trails');
        }
    })
});

app.post('/delete-trail-form', function(req, res){

    let data = req.body;
    let ID = parseInt(data['input-id_trail']);
    
    // if (isNaN(type))
    // {
    //     type = 'NULL'
    // }


    query1 = `DELETE FROM Trails WHERE id_trail = '${data['input-id_trail']}';`; 
        
    db.pool.query(query1, function(error, rows, fields){

        if (error) {           
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/trails');
        }
    })
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
    console.log('Hiker Buddy started on ' + PORT + '; press Ctrl-C to terminate.')
});
