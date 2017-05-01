var express = require("express");
var router = express.Router();

var models = require('../models');
var Page = models.Page;
var User = models.User;



router.get('/', function(req, res) {
    res.redirect('/');
    // res.send('got to GET /wiki/');
});

router.post('/', function(req, res, next) {
    // console.log(Page);
    var page = Page.build({
        urlTitle: "urlTitle",
        title: req.body.title,
        content: req.body.content
    })
    page.save()
        .then(function(page) {
            res.redirect(page.route);
        }).catch(next);

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
