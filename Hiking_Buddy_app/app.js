const { json } = require('express');
const express = require('express');
const app = express();
const PORT = 9327;

app.use(express.urlencoded({
  extended: true
}));


// Database
var db = require('./database/db-connector');

// Express
app.use(express.static(`pages`));

app.get('/', function (req, res) 
{
    res.render('index', {});
});

// GET Statements for the static html pages

app.get('/users', function(req, res)
    {
        res.sendFile('users.html');
    });

app.get('/trails', function(req, res)
    {
        res.sendFile('trails.html');
    });

app.get('/trail_types', function(req, res)
    {
        res.sendFile('trail_types.html');
    });
app.get('/pages/inventory_items', function(req, res)
    {
        res.sendFile('inventory_items.html');
    });

app.get('/pages/packing_lists', function(req, res)
    {
        res.sendFile('packing_lists.html');
    });

app.get('/pages/packing_list_details', function(req, res)
    {
        res.sendFile('packing_list_details.html');
    });

app.get('/pages/hikes', function(req, res)
    {
        res.sendFile('hikes.html');
    });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} ...`)
});