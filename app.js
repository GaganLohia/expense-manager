var app     = require('express')(),
    mongoose    = require('mongoose'),
    path        = require('path'),
    config      = require(path.resolve( __dirname, "./config.js" )),
    user        = require(path.resolve(__dirname,"./models/user.js")),
    bodyParser  = require('body-parser'),
    port        = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect(config.dbUrl);
var db = mongoose.connection;


db.once('open',function(){
    console.log('Database Connected');
});
db.on('error',console.error.bind(
    console, 'connection error:'
));


app.get('/', function(req, res){
    res.send('This is Api End-point for Expense Manager');
});
app.post('/signup',function(req,res){
     var userName = req.body.username;
     var password = req.body.password;
     res.send(userName+" "+password);
     User.findOne({
        username : userName
     },function(err,user){

     })
});
app.listen(port,()=>{
    console.log('Listening to Port ' + port);
});