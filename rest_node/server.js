var express = require('express');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'notas'
});
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

connection.connect(function(err){
  if(err) {
    console.log("Error connecting database ... nn");        
  }
  });

app.get('/', function (req, res) {
  res.send("funciona");
});

app.get('/notes.php', function (req, res) {
  connection.query('SELECT * from nota ', function(err, rows, fields) {
    connection.end();
      if (!err)
        res.send(rows);     
      });
});

app.post('/save.php', function(req, res) {
  var title = req.body.title;
  var note = req.body.note;
  var color = req.body.color;

  let insertQuery = 'INSERT INTO ?? (??,??,??) VALUES (?,?,?)';
  let query = mysql.format(insertQuery,["nota","title","note","color",title,note,color]);
  connection.query(query,(err, response) => {
      if(err) {
          res.send({
              "success": false,
              "message": "Failure"
          });
          return;
      }
      // rows added
      res.send({
        "success": true,
        "message": "Successfully"
    });
  });
  
});

app.post('/update.php', function(req, res) {
  var id = req.body.id;
  var title = req.body.title;
  var note = req.body.note;
  var color = req.body.color;

  let insertQuery = 'UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?';
  let query = mysql.format(insertQuery,["nota","title",title,"note",note,"color",color,"id",id]);
  connection.query(query,(err, response) => {
      if(err) {
          res.send({
              "success": false,
              "message": "Failure"
          });
          return;
      }
      // rows added
      res.send({
        "success": true,
        "message": "Successfully"
    });
  });
  
});

app.post('/delete.php', function(req, res) {
  var id = req.body.id;
  var title = req.body.title;
  var note = req.body.note;
  var color = req.body.color;

  let insertQuery = 'DELETE from ?? where ?? = ?';
  let query = mysql.format(insertQuery,["nota","id",id]);
  connection.query(query,(err, response) => {
      if(err) {
          res.send({
              "success": false,
              "message": "Failure"
          });
          return;
      }
      // rows added
      res.send({
        "success": true,
        "message": "Successfully"
    });
  });
  
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});