var express = require('express');
var cons = require('consolidate');
var jade = require('jade');
var path = require('path');

var app = express();

app.engine('jade', cons.jade);
app.set('views', path.join(__dirnamem, 'views'));
app.set('view engine', 'jade');

var temp = {
  s1: jade.compile(fs.read)
}

app.use(function(req, res){
  res.render('layout', {
    s1: "Hello, I'm the first section.",
    s2: "Hello, I'm the second section."
  })
})

app.listen(3000);
