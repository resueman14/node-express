const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    cart:{
        items:[
            {
                count:{
                    type: Number,
                    required: true,
                    default: 1
                },
                itemId:{
                    type: Schema.Types.ObjectId,
                    ref: 'Item',
                    required: true
                }
            }
        ]
    }
})

userSchema.methods.addToCart = function(item) {
    const clonedItems = [...this.cart.items]
    const idx = clonedItems.findIndex(c=>{
        return c.itemId.toString() === item._id.toString()
    })
    if (idx>=0){
        clonedItems[idx].count = clonedItems[idx].count+1
    } else {
        clonedItems.push({itemId:item._id, count: 1})
    }
    // const newCart = {items: clonedItems}

    // this.cart = newCart
    this.cart = {items:clonedItems}
    return this.save()

}

module.exports = model('User', userSchema)