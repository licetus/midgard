var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'index'
    });
});
router.get('/game', function(req, res, next) {
    res.render('game', {
        title: 'game'
    });
});
router.get('/download', function(req, res, next) {
    res.render('download', {
        title: 'download'
    });
});
router.get('/about', function(req, res, next) {
    res.render('about', {
        title: 'about'
    });
});


module.exports = router;
