var express = require('express');
var router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');
const path = require("path");


router.use('/wiki', wikiRouter);
router.use('/user', userRouter);



module.exports = router;
