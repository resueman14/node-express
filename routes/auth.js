const { Router } = require('express');
const router = Router()
const User = require('../models/user')

router.get('/', async (req,res)=>{
    res.render('auth/login', {
        title: 'Authorization',
        isLogin: true
    })
})

router.get('/logout', async (req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/auth#login')
    })
    
})

router.post('/login', async (req,res)=>{
    const user = await User.findById("60f5a2485921081d08d58efa")
    req.session.user = user
    req.session.isAuthenticated = true
    req.session.save(err=>{
        if (err){
            throw err
        }  
        res.redirect('/')
    })
   
})


module.exports = router