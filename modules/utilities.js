var path        = require('path'),
    jwt         = require('jsonwebtoken'),
    config      = require(path.resolve( __dirname, "../config.js" ));

var isTokenValid = function(token){
    var flag = false;
    jwt.verify(token, config.secretKey, (err, decoded) => {
        if(err==null){
            flag = true;
        }
    });
    return flag;
}

module.exports = {
    isTokenValid : isTokenValid,
};