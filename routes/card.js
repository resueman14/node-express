const {Router} = require('express')
const Item = require('../models/item')
const router = new Router()

function mapCartItems(cart){
    return cart.items.map(c=>({
        ...c.itemId._doc, count: c.count
    }))
}

function computePrice(items){
    return items.reduce((total, item)=>{
        return total += item.price * item.count
    },0)
}

router.post('/add', async(req,res) => {
    const item = await Item.findById(req.body.id)
    await req.user.addToCart(item)
    res.redirect('/card')
})

router.get('/', async(req,res) => {
    const user = await req.user
        .populate('cart.items.itemId')
        .execPopulate()
    const items = mapCartItems(user.cart)
    res.render('card', {
        title: 'Корзина',
        items: items,
        price: computePrice(items),
        isCard: true
    })
})

router.delete('/remove/:id', async (req,res)=>{
    const card = await Card.remove(req.params.id)
    res.status(200).json(card)
})
module.exports = router
