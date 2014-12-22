var express = require('express');
var app = express();
var mongoose = require('mongoose');
var expressHbs = require('express-handlebars');
var cutoff = require('./controllers/cutoff');
var bodyParser = require('body-parser');

app.use( bodyParser.json() ); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
   extended: true
}));

app.engine('hbs', expressHbs({extname: 'hbs', defaultLayout: 'main.hbs'}));
app.set('view engine', 'hbs');


//routes
app.route('/').get(cutoff.cutoffdisplay).
   post(cutoff.cutoffnotification);


var port = process.env.PORT || 5000;
app.listen(port, function () {
	console.log('listening on '+port);
});


mongoose.connect('mongodb://localhost:27017/mainDB');
var db = mongoose.connection;
db.on('error', function callback () {
	console.error('connection error');
});
db.once('open', function callback () {
	console.log('connection success');
});
