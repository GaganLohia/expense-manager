var path        = require('path'),
    mongoose    = require('mongoose'),
    models      = require(path.resolve(__dirname, "../models/schema.js")),
    utils       = require(path.resolve(__dirname, "./utilities")),
    Transaction = models.Transaction;

var addNewTransaction = function (req, res) {
    console.log(req.body);
    var userId              = req.headers.userid;
    var transactionName     = req.body.transactionName;
    var transactionValue    = req.body.transactionValue;
    var transactionType     = req.body.transactionType;
    var newTrans = new Transaction({
        transactionName     : transactionName,
        transactionValue    : transactionValue,
        transactionType     : transactionType,
        userId              : mongoose.Types.ObjectId(userId)
    });
    newTrans.save(function (err) {
        if (err) {
            utils.sendResponse(res, 500, false, 'Please try again later.');
        } else {
            utils.sendResponse(res, 200, true, 'Transaction added successfully.',{id:newTrans._id});
        }
    });
};

var getAllTransactions = function (req, res) {
    var userId = req.headers.userid;
    Transaction.find({
        userId: userId
    }, function (err, transactions) {
        if (err) {
            console.log(err);
            utils.sendResponse(res, 500, false, 'Please try again later.');
        } else {
            var params = {
                transactions: transactions
            };
            utils.sendResponse(res, 200, true, '', params);
        }
    });
};

var updateTransaction = function (req, res) {
    var transactionId       = req.headers.transactionid;
    var userId              = req.headers.userid;
    var transactionName     = req.body.transactionName;
    var transactionValue    = req.body.transactionValue;
    var transactionType     = req.body.transactionType;
    var transactionDate     = req.body.transactionDate;
    Transaction.update({ _id: transactionId }, {
        $set: {
            transactionName     : transactionName,
            transactionValue    : transactionValue,
            transactionType     : transactionType,
            userId              : mongoose.Types.ObjectId(userId),
            transactionDate     : transactionDate
        }
    },
        function (err, obj) {
            if (err) {
                console.log(err);
                utils.sendResponse(res, 500, false, 'Please try again later.');
            }
            else {
                utils.sendResponse(res, 200, true, 'Transaction updated successfully.');
            }
        })

};

var deleteTransaction = function(req,res){
    var transactonId = req.headers.transactionid;
    console.log(mongoose.Types.ObjectId(transactonId));
    Transaction.deleteOne({ _id: mongoose.Types.ObjectId(transactonId) },
        function (err) {
            if (err) {
                console.log(err);
                utils.sendResponse(res, 500, false, 'Please try again later.');
            }
            utils.sendResponse(res, 200, true, 'Transaction deleted successfully.');
        });

}
module.exports = {
    addNewTransaction   : addNewTransaction,
    getAllTransactions  : getAllTransactions,
    updateTransaction   : updateTransaction,
    deleteTransaction   : deleteTransaction
};
