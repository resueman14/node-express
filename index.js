const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views','views')

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.status(200)
    res.render('index',{title:'Главная', isHome: true})
})

app.get('/add',(req,res)=>{
    res.status(200)
    res.render('add',{title:'Добавление нового элемента', isAdd: true})
})

app.get('/items',(req,res)=>{
    res.status(200)
    res.render('items',{title:'Продукты', isItems: true})
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port http://127.0.0.1:${PORT}`)
})