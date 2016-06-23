const router = require('koa-router')();

router.get('/', function *() {
    this.render('frontend', {
        title: 'Tea Frontend',
        csrf: this.csrf,
    });
});

router.get('/:phone/:timestamp', function *() {
    this.render('frontend', {
        title: 'Tea Frontend',
        csrf: this.csrf,
    });
});

module.exports = router;
