var app         = require('express')(),
    mongoose    = require('mongoose'),
    path        = require('path'),
    jwt         = require('jsonwebtoken'),
    bodyParser  = require('body-parser'),
    morgan      = require('morgan'),
    config      = require(path.resolve( __dirname, "./config.js" )),
    models      = require(path.resolve(__dirname,"./models/user.js")),
    port        = process.env.PORT || 3000,
    user        = models.User;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
mongoose.connect(config.dbUrl,{ useNewUrlParser: true } );
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
            if(err.name=='ValidationError'){
                res.json({
                    success : false,
                    msg     : 'User Already Exists!',
                });
            } else {
                res.json({
                    success : false,
                    msg     : 'Please try again later.',
                });
            }
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
            console.log(JSON.stringify(userObj));
            if(userObj.password != password){
                res.json({
                    success : false,
                    msg     : 'Wrong Password'
                });
            } else{
                const payload = {
                    username : userName
                };
                var token = jwt.sign(payload,config.secretKey, {
                    expiresIn : 24*60*60
                  });
                res.json({
                    success : true,
                    id      : userObj._id,
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
function isTokenValid(token){
    var flag = false;
    jwt.verify(token, config.secretKey, function(err, decoded) {
        if(err==null){
            flag = true;
        }
    });
    return flag;
}
app.post('/addNewTransaction',(req,res) =>{
    var token = req.headers.token;
    if(token){
        console.log(isTokenValid(token));
        if(isTokenValid(token)){
            res.json({
                success : true,
                msg     : 'Transaction added successfully.'
            });
        } else{
            res.json({
                success : false,
                msg     : 'Session Expired!'
            });
        }
    } else {
        res.json({
            success : false,
            msg     : 'Token not Provided'
        });
    }
});

app.listen(port,()=>{
    console.log('Listening to Port ' + port);
});

