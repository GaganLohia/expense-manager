var path        = require('path'),
    jwt         = require('jsonwebtoken'),
    models      = require(path.resolve(__dirname,"../models/schema.js")),
    config      = require(path.resolve( __dirname, "../config.js" )),
    utils       = require(path.resolve(__dirname, "./utilities")),
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
                utils.sendResponse(res, 401, false, 'Wrong Password');
            } else{
                const payload = {
                    username : userName
                };
                var token = jwt.sign(payload,config.secretKey, {
                    expiresIn : 24*60*60
                  });
                var params = {
                    id      : userObj._id,
                    token   : token
                }
                utils.sendResponse(res, 200, true, 'SignIn Successful',params);
            }
        } else{
            utils.sendResponse(res, 404, false, 'User Not Found');
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
                utils.sendResponse(res, 409, false, 'User Already Exists!');
            } else {
                utils.sendResponse(res, 500, false, 'Please try again later.');
            }
        } else{
            utils.sendResponse(res, 200, true, 'SignUp Successful');
        }
    });
}
module.exports = {
    signIn : signIn,
    signUp : signUp
};