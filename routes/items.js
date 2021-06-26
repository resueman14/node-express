const {Router} = require('express')
const router = Router()

router.get('/items', (req,res) => {
    res.status(200)
    res.render('items',{title:'Продукты', isItems: true})
})

module.exports = router