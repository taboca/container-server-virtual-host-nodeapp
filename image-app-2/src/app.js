var express = require('express')
var app = express()

app.get('/', function (req, res) {

  console.log("Console log node virtual host www");

  res.send('Hello World from container A, app 2, internally via 8081');

})

app.listen(8081)
