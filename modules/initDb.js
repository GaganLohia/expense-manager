var mongoose        = require('mongoose'), 
    path            = require('path'),
    config          = require(path.resolve( __dirname, "../config.js" ));


var init = function(){
    mongoose.connect(config.dbUrl,{ useNewUrlParser: true } );
    var db = mongoose.connection;
    db.once('open',()=>{
        console.log('Database Connected');
    });
    db.on('error',console.error.bind(
        console, 'connection error:'
    ));
};

module.exports = {
    init : init,
};