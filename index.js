const mongoose = require('mongoose')
const express = require('express')
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const path = require('path')
const csrf = require('csurf')
const homeRoutes = require('./routes/home')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const addRoutes = require('./routes/add')
const cardRoutes = require('./routes/card')
const itemsRoutes = require('./routes/items')
const ordersRoutes = require('./routes/orders')
const authRoutes = require('./routes/auth')
const app = express()
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const variableMiddleware = require('./middleware/variables')
const MONGODB_URI = `mongodb://nowruz:123546@127.0.0.1/shop`
const userMiddleware = require('./middleware/user')
const csurf = require('csurf')

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
})
const store = MongoStore({
  collection: 'sessions',
  uri:MONGODB_URI
}
)
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views','views')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: 'secret key nahuy',
  resave: false,
  saveUninitialized: false,
  store: store
}))
app.use(csurf())
app.use(variableMiddleware)
app.use(userMiddleware)
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)
app.use('/items', itemsRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)


async function start(){
  try {
    await mongoose.connect(MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true})
    const PORT = process.env.PORT || 3000 
    app.listen(PORT, () => {
        console.log(`Server is running on port http://127.0.0.1:${PORT}`)
    })
  } catch (error) {
    console.log(error) 
  }

}
start()

