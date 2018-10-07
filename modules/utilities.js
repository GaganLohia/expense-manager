var path        = require('path'),
    jwt         = require('jsonwebtoken'),
    config      = require(path.resolve( __dirname, "../config.js" ));

var isTokenValid = function(req, res, next){
    var token = req.headers.token;
    if(token){
        var valid = false;
        jwt.verify(token, config.secretKey, (err, decoded) => {
            if(err==null){
                valid = true;
            }
        });
        if(valid){
            return next();
        } else{
            return sendResponse(res, 401, false, 'Session Expired!');
        }
    } else {
        return sendResponse(res, 403, false, 'Token not provided!');
    }
}

var sendResponse = function(resObj, status, success, msg, extraParams = {}){
    var responseObj = {
        success : success,
        msg     : msg,
    };
    responseObj = Object.assign(responseObj, extraParams);
    resObj.status(status).send(responseObj);
}

module.exports = {
    isTokenValid : isTokenValid,
    sendResponse : sendResponse
};