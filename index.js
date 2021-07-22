const mongoose = require('mongoose')
const express = require('express')
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const path = require('path')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const cardRoutes = require('./routes/card')
const itemsRoutes = require('./routes/items')
const ordersRoutes = require('./routes/orders')
const User = require('./models/user')
const app = express()
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views','views')
app.use(async (req,res,next)=>{
  try {
    const user = await User.findById("60f5a2485921081d08d58efa")
    req.user = user
    next()
  } catch (error) {
    console.log(error)
  }
})
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)
app.use('/items', itemsRoutes)
app.use('/orders', ordersRoutes)

async function start(){
  try {
    await mongoose.connect(`mongodb://nowruz:123546@127.0.0.1/shop`,{useNewUrlParser: true, useUnifiedTopology: true})
    const PORT = process.env.PORT || 3000 
    //const PORT = 3000
    const candidate = await User.findOne()
    if (!candidate){
      const user = new User({
        name: "Nowruz",
        email: "nowruz.k@yandex.ru",
        cart: {items:[]}
      })
      await user.save()
    }
    app.listen(PORT, () => {
        console.log(`Server is running on port http://127.0.0.1:${PORT}`)
    })
  } catch (error) {
    console.log(error) 
  }

}
start()

