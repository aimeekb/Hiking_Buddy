// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
const app = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json());
app.use(express.static('public')); // Using Express to serve images and style.css from the public dir
app.use(express.urlencoded({extended: true}));
PORT = 54755;                 // Set a port number at the top so it's easy to change in the future
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

app.post('/delete-user-form', function(req, res){

    let data = req.body;
    let ID = parseInt(data['input-id_user']);

    query1 = `DELETE FROM Users WHERE id_user = '${data['input-id_user']}';`; 
        
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
            FROM Trails LEFT JOIN Trail_types \
        ON Trails.id_trail_type = Trail_types.id_trail_type
        ORDER BY id_trail;`;
        
        db.pool.query(query1, function(error, rows, fields){    
            res.render('trails', {data: rows});                  
        })                                                      
    });  
              
app.post('/add-trail-form', function(req, res){

    let data = req.body;
    let type = parseInt(data['input-trail_type']);

    let distance = parseFloat(data['input-trail_distance']);

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


// TRAIL_TYPES ROUTES

app.get('/trail_types', function(req, res){
    let query1 = `SELECT id_trail_type AS ID, trail_type_description AS Description FROM Trail_types;`;
    
    db.pool.query(query1, function(error, rows, fields){    
        if (error) {           
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
        res.render('trail_types', {data: rows});  
        }                
    })                                                      
});  

app.post('/add-trail_types', function(req, res){

    let data = req.body;
    
    query1 = 
        `INSERT INTO Trail_types(
            trail_type_description
        )VALUES(
            '${data['input-trail_type_description']}'
        );`;

    db.pool.query(query1, function(error, rows, fields){

        if (error) {           
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/trail_types');
        }
    })
});


// INVENTORY_ITEMS ROUTES

app.get('/inventory_items', function(req, res){
    
    let query1;

    if (req.query.item_name === undefined)
    {
        query1 = 
        `SELECT 
            id_item AS ID, 
            item_name AS Name, 
            item_description AS Description,
            item_weight AS Weight 
        FROM Inventory_items;`;
    }
    else
    {
        query1 = `SELECT * FROM Inventory_items WHERE item_name LIKE "%${req.query.item_name}%"`
    }

    db.pool.query(query1, function(error, rows, fields){
        if (error) {           
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            return res.render('inventory_items', {data: rows});  
        }                
    })               
}); 

app.post('/add-inventory_items', function(req, res){

    let data = req.body;
    let weight = parseFloat(data['input-item_weight']);

    query1 = 
        `INSERT INTO Inventory_items(
            item_name,
            item_description,
            item_weight
        )VALUES(
            '${data['input-item_name']}',
            '${data['input-item_description']}',
            '${weight}'
        );`;

    db.pool.query(query1, function(error, rows, fields){

        if (error) {           
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/inventory_items');
        }
    })
});


// PACKING_LISTS ROUTES

app.get('/packing_lists', function(req, res){
    let query1 = 
    `SELECT
        id_packing_list AS ID,
        Trail_types.trail_type_description AS Description
    FROM Packing_lists
    LEFT JOIN Trail_types ON Packing_lists.id_trail_type = Trail_types.id_trail_type
    ORDER BY id_packing_list;`;

    let query2 =
    `SELECT
        id_trail_type,
        trail_type_description
    FROM Trail_types
    ORDER BY id_trail_type;`;
    
    db.pool.query(query1, function(error, rows, fields){    
        let packing_list_id = rows;
        if (error) {           
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            db.pool.query(query2, (error, rows, fields) => {
                let trail_types = rows;
                if (error) {           
                    console.log(error)
                    res.sendStatus(400);
                }
                else
                {
                    res.render('packing_lists', {data: packing_list_id, trail_type_id: trail_types});    
                }
            })
        }
    })                                                      
});  

app.post('/add-packing_lists', function(req, res){

    let data = req.body;

    query1 = 
        `INSERT INTO Packing_lists(
            id_trail_type
        )VALUES(
            '${data['input-id_trail_type']}'
        );`;

    db.pool.query(query1, function(error, rows, fields){

        if (error) {           
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/packing_lists');
        }
    })
});

app.post('/delete-packing_lists', function(req, res){

    let data = req.body;
    let ID = parseInt(data['input-id_packing_list']);

    query1 = `DELETE FROM Packing_lists WHERE id_packing_list = '${data['input-id_packing_list']}';`; 
        
    db.pool.query(query1, function(error, rows, fields){

        if (error) {           
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/packing_lists');
        }
    })
});


// PACKING_LIST_DETAILS ROUTES

app.get('/packing_list_details', function(req, res){

    let query1 = 
    `SELECT
        id_packing_list_details AS DetailsID,
        Inventory_items.item_name AS Item,
        Packing_lists.id_packing_list AS PackingList
    FROM Packing_list_details
    LEFT JOIN Inventory_items ON Packing_list_details.id_item = Inventory_items.id_item
    LEFT JOIN Packing_lists ON Packing_list_details.id_packing_list = Packing_lists.id_packing_list
    ORDER BY Packing_lists.id_packing_list;`;

    let query2 = 
    `SELECT 
        id_item, 
        item_name 
    FROM Inventory_items
    ORDER BY id_item;`;
    
    let query3 = 
    `SELECT
        id_packing_list
    FROM Packing_lists
    ORDER BY id_packing_list;`;

    db.pool.query(query1, function(error, rows, fields){   
        let packing_list_details = rows;
        if (error) { 
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            db.pool.query(query2, function(error, rows, fields){
                let inventory_items = rows;   
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else
                {
                    db.pool.query(query3, function(error, rows, fields){
                        let packing_list_id = rows;   
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        }
                        else
                        {
                            res.render('packing_list_details', {data:packing_list_details, inventory_items, packing_list_id}); 
                        }
                    })      
                }
            })
        }    
    }) 
});

app.post('/add-packing_list_details', function(req, res){

    let data = req.body;

    query1 = 
        `INSERT INTO Packing_list_details(
            id_item,
            id_packing_list
        ) VALUES (
            '${data['input-id_item']}',
            '${data['input-packing_list_id']}'
        );`;


    db.pool.query(query1, function(error, rows, fields){

        if (error) {           
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/packing_list_details');
        }
    })
});


// COMPLETED HIKES ROUTES

app.get('/hikes', function(req, res){

    let query1 = 
    `SELECT 
        id_hike AS ID, 
        Users.first_name AS FirstName,
        Users.last_name AS LastName,
        Trails.trail_name AS Trail,   
        Packing_lists.id_packing_list AS PackingList,
        hike_date AS Date
    FROM Hikes 
    LEFT JOIN Users ON Hikes.id_user = Users.id_user
    LEFT JOIN Trails ON Hikes.id_trail = Trails.id_trail
    LEFT JOIN Packing_lists ON Hikes.id_packing_list = Packing_lists.id_packing_list
    ORDER BY id_hike;`;

    let query2 = 
    `SELECT 
        id_user, 
        first_name,
        last_name
    FROM Users
    ORDER BY id_user;`;

    let query3 = 
    `SELECT 
        id_trail, 
        trail_name
    FROM Trails
    ORDER BY id_trail;`;

    let query4 = 
    `SELECT 
        id_packing_list
    FROM Packing_lists 
    ORDER BY id_packing_list;`;
    
    db.pool.query(query1, function(error, rows, fields){    
        let data = rows;
        if (error) {
                    
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            db.pool.query(query2, function(error, rows, fields){
                let id_user = rows;
                if (error) {
                    
                    console.log(error);
                    res.sendStatus(400);
                }
                else
                {
                   db.pool.query(query3, function(error, rows, fields){
                        let id_trail = rows;
                        if (error) {
                        
                            console.log(error);
                            res.sendStatus(400);
                        }
                        else
                        {
                            db.pool.query(query4, function(error, rows, fields){
                                let id_packing_list = rows;
                                if (error) {
                        
                                    console.log(error);
                                    res.sendStatus(400);
                                }
                                else 
                                {
                                    res.render('hikes', {data, id_user, id_trail, id_packing_list}); 
                                }
                            })
                        }
                   }) 
                }
            }) 
        }                 
    })  
}); 

app.post('/add-hikes', function(req, res){

    let data = req.body;

    query1 = 
        `INSERT INTO Hikes(
            id_user,
            id_trail,  
            id_packing_list,
            hike_date
        )VALUES(
            '${data['input-id_user']}',
            '${data['input-id_trail']}',
            '${data['input-id_packing_list']}',
            '${data['input-hike_date']}'
        );`;

    db.pool.query(query1, function(error, rows, fields){

        if (error) {           
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/hikes');
        }
    })
});

app.post('/delete-hikes', function(req, res){

    let data = req.body;
    let ID = parseInt(data['input-id_hike']);

    query1 = `DELETE FROM Hikes WHERE id_hike = '${data['input-id_hike']}';`; 
        
    db.pool.query(query1, function(error, rows, fields){

        if (error) {           
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/hikes');
        }
    })
});

/*
    LISTENER
*/
app.listen(PORT, function(){            
    console.log('Hiker Buddy started on ' + PORT + '; press Ctrl-C to terminate.')
});
