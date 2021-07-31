const {Router} = require('express')
const router = Router()
const auth = require('../middleware/auth')
const Item = require('../models/item')

router.get('/', auth, (req,res) => {
    res.status(200)
    res.render('add',{title:'Добавление нового элемента', isAdd: true})
})

router.post('/', auth, async (req,res)=>{
    const item = new Item({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img,
        userId: req.user._id
    })
    try {
        await item.save()
        res.redirect('/items')
    } catch (error) {
        console.log(error)
    }
    
    
})

module.exports = router