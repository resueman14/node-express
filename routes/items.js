const {Router} = require('express')
const Item = require('../models/item')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const router = Router()

router.get('/', async (req,res) => {
    const items = await Item.find().populate('userId', 'name email').select('price title img')
    res.status(200)
    res.render('items',{
        title:'Продукты', 
        isItems: true,
        items
    })
})

router.get('/:id', async (req,res)=>{
    const item = await Item.findById(req.params.id)
    res.render('item',{
        layout: 'empty',
        title: `Item ${item.title}`,
        item
    })
})

router.get('/:id/edit', auth, admin,async (req,res)=>{
    if (!req.query.allow){
        return res.redirect('/')
    }
    const item = await Item.findById(req.params.id)
    res.render('item-edit',{
        title: `Редактировать ${item.title}`,
        item
    })
})

router.post("/edit", auth ,admin, async(req,res)=>{
    const {id} = req.body
    delete req.body.id
    await Item.findByIdAndUpdate(id, req.body)
    return res.redirect('/items')
})

router.post("/remove", auth, admin,async(req,res)=>{
    try{
        await Item.deleteOne({ _id: req.body.id })
        res.redirect('/items')
    } catch(error){
        console.log(error)
    }
    
})

module.exports = router