const router = require('express').Router();
const { getErrorMessage } = require('../utils/errorHelpers');
const customManager = require('../managers/customManager');

router.get('/', async (req, res)=>{

    await customManager.getAll().lean()
        .then((custom) => {
            res.render('custom/catalog', {custom});
            
        });
});

router.get('/create', (req, res) => {
    res.render('custom/create');
});

router.post('/create', async (req, res) => {
    const customData = {
        ...req.body,
        owner: req.user._id
    }
    try {
        await customManager.create(customData)
            .then(() => res.redirect('/custom'))

    } catch (error) {
        res.render('custom/create', {
            error: getErrorMessage(error),  
            data: customData  
        });
    }
});

router.get('/:customId/details', async (req, res) => {
    const customId = req.params.customId;
    const custom = await customManager.getOne(customId).lean();

    if (!custom) {
        res.status(404).send("custom not found");
        return;
    };

    let hasBought= custom.buycustom.includes(req.user?._id.toString());
    const isOwner = req.user?._id.toString() === custom.owner._id.toString();
    const isLogged = Boolean(req.user);


    res.render('custom/details', { ...custom, isOwner, isLogged, hasBought });
});

router.get('/:customId/buy', async (req, res) => {
    const customId = req.params.customId;
    const user = req.user;
    const custom = await customManager.getOne(customId).lean();

    const isOwner = req.user?._id.toString() === custom.owner._id.toString();
    const isLogged = Boolean(req.user);

    if (isLogged && !isOwner) {
        try {
            await customManager.buy(customId, user._id);
            res.redirect(`/custom/${customId}/details`);
        } catch (err) {
            res.render('custom/details', {
                error: 'You cannot buy this custom',
                isOwner,
                isLogged,
            });
        }
    } else {
        res.redirect(`/custom/${customId}/details`);
    }
});

router.get('/:customId/delete', async (req, res) => {

    try {
        const customId = req.params.customId;
        await customManager.delete(customId);
        res.redirect('/custom')

    } catch (error) {
        res.redirect(`/custom/${customId}/details`, { error: 'Unsuccessful deletion' })
    }

})

router.get('/:customId/edit', async (req, res) => {
    const customId = req.params.customId;

    try {
        const custom = await customManager.getOne(customId).lean();
        res.render('custom/edit', {...custom} )

    } catch (error) {
        res.render('/404')
    }
});

router.post('/:customId/edit', async (req, res) =>{
    const customId = req.params.customId;
    const customData = req.body

    try {
        const custom = await customManager.edit(customId, customData);
        res.redirect('/custom');
    } catch (error) {
        res.render('custom/edit', { error: 'Unable to update custom', ...customData })
    }

})


module.exports = router;