var express = require("express");
var router = express.Router();

var models = require('../models');
var Page = models.Page;
var User = models.User;



router.get('/', function(req, res) {

    Page.findAll({})
    .then(pages => {
        console.log("pages on /wiki", pages)
        res.render('index', { pages: pages })
    })
    // res.redirect('/');
    // res.send('got to GET /wiki/');
});

router.post('/', function(req, res, next) {
    // console.log(Page);
    User.findOrCreate({
        where: {
            name: req.body.name,
            email: req.body.email
        }
    })
    .then(values => {
        console.log("values in wiki post", values)
        let user = values[0]
        console.log("name", user.dataValues)
        var page = Page.build({
            urlTitle: req.body.urlTitle,
            title: req.body.title,
            content: req.body.content,
            name: user.dataValues.name,
            email: user.dataValues.email
        })
        return [user, page.save()]
    })
    .spread(function(user, page) {
        return page.setAuthor(user)
    })
    .then(page => {
        res.redirect(page.route);
    })
    .catch(next);
});

router.get('/add', function(req, res) {
    res.render('addpage');
});


router.get('/:urlTitle', function(req, res, next) {
    Page.findAll({
        where: {
            urlTitle: req.params.urlTitle
        }
    }).then(function(page) {

        res.render('wikipage', {page: page});
    }).catch(next);
});


module.exports = router;
