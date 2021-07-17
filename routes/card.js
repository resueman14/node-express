const {Router} = require('express')
const Card = require('../models/card')
const Item = require('../models/item')
const router = new Router()

router.post('/add', async(req,res) => {
    const item = await Item.getById(req.body.id)
    await Card.add(item)
    res.redirect('/card')
})

router.get('/', async(req,res) => {
    const card = await Card.fetch()
    res.render('card', {
        title: 'Корзина',
        items: card.items,
        price: card.price,
        isCard: true
    })
})

router.delete('/remove/:id', async (req,res)=>{
    const card = await Card.remove(req.params.id)
    res.status(200).json(card)
})
module.exports = router
