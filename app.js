var app             = require('express')(),
    bodyParser      = require('body-parser'),
    morgan          = require('morgan'),
    path            = require('path'),
    Authenticate    = require(path.resolve(__dirname,"./modules/authenticate.js")),
    Transactions    = require(path.resolve(__dirname,"./modules/transaction.js")),
    InitDb          = require(path.resolve(__dirname,"./modules/initDb.js")),
    utils           = require(path.resolve( __dirname, "./modules/utilities" )),
    port            = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', ()=>{
    res.send('This is Api End-point for Expense Manager');
});
app.post('/signup',Authenticate.signUp);
app.post('/signin',Authenticate.signIn);
app.post('/addNewTransaction',utils.isTokenValid,Transactions.addNewTransaction);
app.get('/getAllTransactions',utils.isTokenValid,Transactions.getAllTransactions);
app.post('/updateTransaction',utils.isTokenValid,Transactions.updateTransaction);
app.listen(port,()=>{
    console.log('Listening to Port ' + port);
    InitDb.init();
});