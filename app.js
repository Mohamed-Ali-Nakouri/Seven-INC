const express = require('express');
const app  = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const employeeRoutes = require('./api/routes/employee');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({limit: '10mb',extended: true}));
app.use(bodyParser.json({limit: '10mb'}));


app.use('/', employeeRoutes);

app.use((req,res,next) => {
    const error  = new Error('Verify the END-POINT or the request Method');
    error.status=418;
    next(error);
});


app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message:error.message
        }
    });
});

module.exports = app ;