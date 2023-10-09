const router = require('express').Router();
const animalsManager = require('../managers/animalsManager')

router.get('/', async (req, res) => {

    await animalsManager.getAll()
        .then((animals) => {

            
            res.render('home', {animals: animals.slice(-3)});
            
        }).catch(err=> console.log(err))



    });

    router.get('/404', (req, res)=>{
        res.render('home/404')
    })
    
    module.exports = router;

