'use strict';

var express = require('express');
var app = module.export = express();

app.use(express.static(__dirname + '/public'));

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.get('*', function(req, res) { 
  res.render('index');
});

if (!module.parent) app.listen(process.env.port || 5000);
