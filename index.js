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
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});
app.post('/',function(req,res){
  var jmeno=req.body.jmeno;
  var email=req.body.email;
  var heslo=req.body.heslo;
  var passwordHash = require('password-hash');
  var hasheslo = passwordHash.generate(heslo);
  var moment = require('moment');
  var datum = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  res.sendFile(__dirname + '/red.html');

  con.connect(function(err) {
  if (err) throw err;
  //není obrana proti SQL injection - > zařídit 

  var sql = "INSERT INTO uzivatele (jmeno, email,heslo,datum) VALUES ('"+jmeno+"', '"+email+"', '"+hasheslo+"','"+datum+"')"; 

  con.query(sql, function (err, result) {
    if(err) throw err;
    console.log("Uzivatel zaregistrovan");
     res.end();
  });
  });
});

app.listen(3000);
console.log("Běží na portu 3000");

  
