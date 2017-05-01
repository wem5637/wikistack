var express = require("express");
var router = express.Router();

var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next) {
    User.findAll({})
    .then(users => {
        console.log("users in users route", users)
        res.render('users', {users: users})
    })
    .catch(next)
});

router.get('/:userid', function(req, res, next) {
    let users = User.find({
        where: {
            user: name
        }
    })
    .then(user => {
        res.render('users', {user: user})
    })
    .catch(next)
});

// router.post('/', function(req, res, next) {
//     res.send('got to POST /user/');
// });

// router.get('/add', function(req, res, next) {
//     res.send('got to GET /user/add');
// });

module.exports = router;
