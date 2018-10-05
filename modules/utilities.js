var path        = require('path'),
    jwt         = require('jsonwebtoken'),
    config      = require(path.resolve( __dirname, "../config.js" ));

var isTokenValid = function(req, res, next){
    var token = req.headers.token;
    if(token){
        jwt.verify(token, config.secretKey, (err, decoded) => {
            if(err==null){
                return next();
            }
        });
        return res.json({
            success : false,
            msg     : 'Session Expired!'
        });
    } else {
        return res.json({
            success : false,
            msg     : 'Token not provided!'
        });
    }
}

module.exports = {
    isTokenValid : isTokenValid,
};