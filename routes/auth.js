const { Router } = require('express');
const bcrypt = require('bcryptjs')
const router = Router()
const User = require('../models/user')

router.get('/', async (req,res)=>{
    res.render('auth/login', {
        title: 'Authorization',
        isLogin: true,
        loginError: req.flash('loginError'),
        registerError: req.flash('registerError')
    })
})

router.get('/logout', async (req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/auth#login')
    })
    
})

router.post('/login', async (req,res)=>{
    try {
        const {email, password} = req.body
        const candidate = await User.findOne({email})
        if(candidate){
            const areSame = await bcrypt.compare(password, candidate.password)
            if(areSame){
                req.session.user = candidate
                if(candidate.name=='admin'){
                    req.session.isAdmin = true
                }else{req.session.isAdmin = false }
                req.session.isAuthenticated = true
                req.session.save(err=>{
                    if (err){
                        throw err
                    }  
                    res.redirect('/')
                })
            } else {
                req.flash('loginError', 'Неверный пароль')
                res.redirect('/auth#login')
            }
        }else{
            req.flash('loginError', 'Такого пользователя не существует')
            res.redirect('/auth#login')
        }
    } catch(e){
        console.log(e)
    }


   
})

router.post('/register', async (req,res)=>{
    try {
        const {name,email,password, repeat} = req.body
        const candidate = await User.findOne({email})
        if(candidate){
            req.flash('registerError','E-mail already using')
            res.redirect('/auth#register')
        } else {
            const hashPassword = await bcrypt.hash(password,10)
            const user = new User({
                email:email, 
                name:name,
                password:hashPassword,
                cart:{items:[]}
            })
          await user.save()  
          res.redirect('/auth#register')
        } 
    } catch (err) {
        console.log(err)
    }
   
})


module.exports = router