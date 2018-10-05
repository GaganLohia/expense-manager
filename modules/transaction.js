var path            = require('path'),
    mongoose        = require('mongoose'),
    models          = require(path.resolve(__dirname,"../models/schema.js")),
    utils           = require(path.resolve( __dirname, "./utilities" )),
    Transaction     = models.Transaction;

var addNewTransaction = function(req,res){
    var token             = req.headers.token;
    var userId            = req.headers.userid;
    var transactionName   = req.body.transactionName;
    var transactionValue  = req.body.transactionValue;
    var transactionType   = req.body.transactionType;
    var transactionDate   = req.body.transactionDate;
    if(token){
        console.log(utils.isTokenValid(token));
        if(utils.isTokenValid(token)){
            var newTrans = new Transaction({
                transactionName     : transactionName,
                transactionValue    : transactionValue,
                transactionType     : transactionType,
                userId              : mongoose.Types.ObjectId(userId),
                transactionDate     : transactionDate
            });
            newTrans.save(function(err){
                if(err){
                    res.json({
                        success : false,
                        msg     : 'Transaction not added!'
                    });
                } else {
                    res.json({
                        success : true,
                        msg     : 'Transaction added successfully.'
                    });
                }
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
};

var getAllTransactions = function(req,res){
    var userId            = req.headers.userid;
    Transaction.find({
        userId : userId
    },function(err,transactions){
        res.json(transactions);
    });
};

var updateTransaction = function(req,res){
    var transactionId = req.headers.transactionid;
    var token             = req.headers.token;
    var userId            = req.headers.userid;
    var transactionName   = req.body.transactionName;
    var transactionValue  = req.body.transactionValue;
    var transactionType   = req.body.transactionType;
    var transactionDate   = req.body.transactionDate;
    Transaction.update({_id : transactionId} , { $set : {
                transactionName: transactionName,
                transactionValue: transactionValue,
                transactionType: transactionType,
                userId : mongoose.Types.ObjectId(userId),
                transactionDate : transactionDate
            }
        },
        function(err,obj){
        if(err){
            res.json({
                success : false,
                msg     : 'Transaction not updated!'
            });
        }
        else{
            res.json({
                success : true,
                msg     : 'Transaction updated successfully.'
            });
        }
    })
    
};
module.exports = {
    addNewTransaction : addNewTransaction,
    getAllTransactions : getAllTransactions,
    updateTransaction  : updateTransaction
};
    