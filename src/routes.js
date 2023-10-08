const router = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const animalsController = require('./controllers/animalsController');

router.use(homeController);
router.use( '/users', userController);
router.use( '/animals', animalsController);


router.get('*', (req, res)=>{
    res.redirect('/404')
});

module.exports = router;