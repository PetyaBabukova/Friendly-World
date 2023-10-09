const router = require('express').Router();
// const { getErrorMessage } = require('../utils/errorHelpers');
const animalsManager = require('../managers/animalsManager');

router.get('/', async (req, res)=>{

    await animalsManager.getAll()
        .then((animals) => {
            res.render('animals/dashboard', {animals});
            
        });
});

router.get('/create', (req, res) => {
    res.render('animals/create');
});

router.post('/create', async (req, res) => {
    const animalData = {
        ...req.body,
        owner: req.user._id
    }

    try {
        await animalsManager.create(animalData)
            res.redirect('/animals')

    } catch (error) {

        res.render('animals/create', {
            error: 'Animal creation failed',  
            data: animalData  
        });
    }
});

router.get('/:animalId/details', async (req, res) => {
    const animalId = req.params.animalId;
    const animal = await animalsManager.getOne(animalId).lean();

    if (!animal) {
        res.status(404).send("animal not found");
        return;
    };

    let hasDonate= animal.donations.toString().includes(req.user?._id.toString());
    const isOwner = req.user?._id.toString() === animal.owner._id.toString();
    const isLogged = Boolean(req.user);

    res.render('animals/details', { ...animal, isOwner, isLogged, hasDonate });
});

router.get('/:animalId/edit', async (req, res) => {
    const animalId = req.params.animalId;

    try {
        const animal = await animalsManager.getOne(animalId).lean();
        res.render('animals/edit', {...animal} )

    } catch (error) {
        res.render('/404')
    }
});

router.post('/:animalId/edit', async (req, res) =>{
    const animalId = req.params.animalId;
    const animalData = req.body

    try {
        const animal = await animalsManager.edit(animalId, animalData);
        res.redirect('/animals');
    } catch (error) {
        res.render('animals/edit', { error: 'Unable to update animal', ...animalData })
    }

});

router.get('/:animalId/delete', async (req, res) => {

    try {
        const animalId = req.params.animalId;
        await animalsManager.delete(animalId);
        res.redirect('/animals')

    } catch (error) {
        res.redirect(`/animals/${animalId}/details`, { error: 'Unsuccessful deletion' })
    }

})

router.get('/:animalId/donate', async (req, res) => {
    const animalId = req.params.animalId;
    const user = req.user;
    const animal = await animalsManager.getOne(animalId).lean();
    
    const isOwner = req.user?._id.toString() === animal.owner._id.toString();
    const isLogged = Boolean(req.user);
    // console.log(isLogged);

    if (isLogged && !isOwner) {
        try {
            await animalsManager.donate(animalId, user._id);
            res.redirect(`/animals/${animalId}/details`);
        } catch (err) {

            console.log(err);
            // res.render('animals/details', {...animal,
            //     error: 'You cannot donate',
            //     isOwner,
            //     isLogged,
            // });
        }
    } else {
        res.redirect(`/animals/${animalId}/details`);
    }
});

router.get('/search', async (req, res)=>{
    animalsManager.getAll()
        .then((animals)=> {
            res.render('animals/search', {animals})
        })
    
});

router.post('/search', async (req, res)=>{

    animalsManager.search(req.body.search)
    .then((animals)=>{
        res.render('animals/search', {animals})
    })
    .catch((err)=> {
        console.log(err);
    })
})






router.get('/search', (req, res)=>{
    res.render('animals/search')
})


module.exports = router;