var express = require('express')
var app = express()
 
app.get('/', function (req, res) { 

  console.log("Console log node virtual host www");

  res.send('Hello World from container A, app 1, internally via 8080');

})
 
app.listen(8080)
