var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var transaction = new Schema({
    transactionName     : {type: String, required: true},
    transactionValue    : {type: String, required: true},
    transactionType     : {type: String, required: true},
    transactionDate     : {type: Date, default:Date.now()},
    userId              : {type : mongoose.Schema.Types.ObjectId, ref : 'User'}
});
var userSchema = new Schema({ 
    username                : { type: String, required: true, unique: true }, 
    password                : { type: String, required: true }
});
userSchema.plugin(uniqueValidator);
module.exports = {
    User                    : mongoose.model('User', userSchema),
    Transaction             : mongoose.model('Transaction', transaction)
};
