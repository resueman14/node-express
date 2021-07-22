const {Router} = require('express')
const Order = require('../models/order')
const router = Router()

router.get('/', async (req,res)=>{
    try {
        const orders = await Order.find({'user.userId':req.user._id})
            .populate('user.userId')
        res.render('orders',{
            orders: orders.map(o=>{return {
                        ...o.toJSON(), 
                        price: o.items.reduce((total, i)=>{
                            return total += i.count * i.item.price
                    }, 0)
                }
            }),
            isOrder: true,
            title: 'Заказы'
        })
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const user = await req.user
            .populate('cart.items.itemId')
            .execPopulate()
        const items = user.cart.items.map(i => ({
            count : i.count,
            item: {...i.itemId.toJSON()}
        }))

        const order = new Order({
            user: {
                name: req.user.name,
                userId : req.user
            },
            items : items
        })
        await order.save()
        await req.user.clearCart()
        res.redirect('/orders')
    } catch (error) {
        console.log(error)
    }
})

module.exports = router