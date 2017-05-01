var express = require("express");
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('got to GET /user/');
});

router.post('/', function(req, res, next) {
    res.send('got to POST /user/');
});

router.get('/add', function(req, res, next) {
    res.send('got to GET /user/add');
});

module.exports = router;
