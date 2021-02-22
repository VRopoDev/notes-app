const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const notes = require('./routes/notes');
const categories = require('./routes/categories');

const port = process.env.port || 3000;

const app = express();

// Body Parser MidleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', notes);
app.use('/api', categories);


app.listen(port, function(){
    console.log('Server started on port ' + port);
});