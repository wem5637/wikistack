const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const nunjucks = require("nunjucks");
const path = require("path");
const models = require('./models');
const routes = require('./routes');
const app = express();


//middleware


//morgan middleware
app.use(morgan('dev'));


//bodyparser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//express middleware
app.use(express.static(path.join(__dirname, '/public')));

//home page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//nunjucks middleware
var env = nunjucks.configure('views', { noCache: true });
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

models.User.sync()
    .then(function() {
        return models.Page.sync();
    })
    .then(function() {
        // make sure to replace the name below with your express app
        app.listen(3000, function() {
            console.log('Server is listening on port 3000!');
        });
    })
    .catch(console.error);



//routes middleware
app.use('/', routes);

