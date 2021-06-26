const {Router} = require('express')
const router = Router()

router.get('/', (req,res) => {
    res.status(200)
    res.render('add',{title:'Добавление нового элемента', isAdd: true})
})

router.post('/', (req,res)=>{
    console.log(req.body)
    res.redirect('/items')
})

module.exports = router