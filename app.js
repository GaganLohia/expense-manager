//Required Libraries
var express     = require('express'),
    mongoose    = require('mongoose');

//Setting up
var app = express();
mongoose.connect('mongodb://gaganlohia:Password1@ds237072.mlab.com:37072/expense-manager')
var db = mongoose.connection;

//App Code
db.once('open',function(){
    console.log('Database Connected');
});
db.on('error',console.error.bind(console, 'connection error:'));
app.get('/', function(req, res){
    res.send('hello world');
  });

app.listen(3000);