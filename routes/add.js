const {Router} = require('express')
const router = Router()
const Item = require('../models/item')

router.get('/', (req,res) => {
    res.status(200)
    res.render('add',{title:'Добавление нового элемента', isAdd: true})
})

router.post('/', async (req,res)=>{
    
    //const item = new Item(req.body.title, req.body.price, req.body.img)
    const item = new Item({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img
    })
    try {
        await item.save()
        res.redirect('/items')
    } catch (error) {
        console.log(error)
    }
    
    
})

module.exports = router