var app         = require('express')(),
    mongoose    = require('mongoose'),
    path        = require('path'),
    jwt         = require('jsonwebtoken'),
    bodyParser  = require('body-parser'),
    morgan      = require('morgan'),
    config      = require(path.resolve( __dirname, "./config.js" )),
    user        = require(path.resolve(__dirname,"./models/user.js")),
    port        = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
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
    var newUser = new user({
        username : userName,
        password : password
    });
    newUser.save(function(err){
        if(err){
            throw err;
        } else{
            res.json({
                success : true,
                msg     : 'SignUp Successful',
            });
        }
    });
});
app.post('/signin',function(req,res){
    var userName = req.body.username;
    var password = req.body.password;
    user.findOne({
        username : userName
     },function(err,userObj){
        if(userObj){
            if(userObj.password != password){
                res.json({
                    success : false,
                    msg     : 'Wrong Password'
                });
            } else{
                const payload = {
                    username : userName
                };
                var token = jwt.sign(payload,config.secretKey);
                res.json({
                    success : true,
                    msg     : 'SignIn Successful',
                    token   : token
                });
            }
        } else{
            res.json({
                success : false,
                msg     : 'User Not Found'
            });
        }
     })
});
app.listen(port,()=>{
    console.log('Listening to Port ' + port);
});