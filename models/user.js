var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var transaction = new Schema({
        transactionName: String,
        transactionValue: {type: String, required: false},
        transactionType: {type: String, required: false},
        userId : {type : mongoose.Schema.Types.ObjectId, ref : 'User'}
});
var userSchema = new Schema({ 
    username: { type: String, required: true, unique: true }, 
    password: { type: String, required: true },
    transactions: [{type : mongoose.Schema.Types.ObjectId, ref : 'Transaction'}],
});
userSchema.plugin(uniqueValidator);
module.exports = {
    User : mongoose.model('User', userSchema),
    Transaction : mongoose.model('Transaction', transaction)
};
