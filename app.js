var express = require('express');
var cons = require('consolidate');
var jade = require('jade');
var path = require('path');
var fs = require('fs');

var app = express();

app.engine('jade', cons.jade);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var temp = {
  s1: jade.compile(fs.readFileSync(path.join(__dirname, 'views', 's1.jade'))),
  s2: jade.compile(fs.readFileSync(path.join(__dirname, 'views', 's2.jade')))
}

var getData = {
  d1: function (fn) {
    setTimeout(fn, 3000, null, {content: "Hello, I'm the first section."})
  },
  d2: function (fn) {
    setTimeout(fn, 5000, null, {content: "Hello, I'm the second section."})
  }
}

var static = express.static(path.join(__dirname, 'static'));

app.use('/static', function (req, res, next) {
  setTimeout(static, 2000, req, res, next);
})

app.use(function(req, res){
  var n = 2;
  var result = {};

  getData.d1(function (err, s1data) {
    result.s1data = s1data;
    --n || writeResult();
  });

  getData.d2(function (err, s2data) {
    result.s2data = s2data;
    --n || writeResult();
  });

  function writeResult() {
    res.render('layout', {
      s1: temp.s1(result.s1data),
      s2: temp.s2(result.s2data)
    });
  }
});

app.listen(3000);

