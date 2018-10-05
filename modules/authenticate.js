var path        = require('path'),
    jwt         = require('jsonwebtoken'),
    models      = require(path.resolve(__dirname,"../models/schema.js")),
    config      = require(path.resolve( __dirname, "../config.js" )),
    User        = models.User;
var signIn = function(req, res){
    var userName = req.body.username;
    var password = req.body.password;
    User.findOne({
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
}
var signUp = function(req,res){
    var userName = req.body.username;
    var password = req.body.password;
    var newUser = new User({
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
}
module.exports = {
    signIn : signIn,
    signUp : signUp
};