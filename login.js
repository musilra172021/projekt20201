var express = require("express");
var app     = express();
var path    = require("path");
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var con = mysql.createConnection({
     host : "localhost",
     user : "root",
     password : "",
     database : "tvojedb"
});

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/', function(request, response) {
  var jmeno = request.body.username;
  var heslo = request.body.password;
  if (jmeno && heslo) {
    con.query('SELECT * FROM uzivatele WHERE jmeno = ? AND heslo = ?', [jmeno, heslo], function(error, results, fields) {
      if (results.length > 0) {
        response.send("Přihlášení úspěšné");
      } else {
        response.send('Neplatné přihlašovací údaje');
      }     
      response.end();
    });
  } else {
    response.send('Vyplňte prázdné pole');
    response.end();
  }
});

app.listen(3000);
console.log("Běží na portu 3000");