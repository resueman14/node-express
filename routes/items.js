const {Router} = require('express')
const Item = require('../models/item')
const router = Router()

router.get('/', async (req,res) => {
    const items = await Item.getAll()
    res.status(200)
    res.render('items',{
        title:'Продукты', 
        isItems: true,
        items
    })
})

module.exports = router