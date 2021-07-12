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

router.get('/:id', async (req,res)=>{
    const item = await Item.getById(req.params.id)
    res.render('item',{
        layout: 'empty',
        title: `Item ${item.title}`,
        item
    })
})

module.exports = router