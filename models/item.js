const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const path = require('path')
const { rejects } = require('assert')
class Item {
    constructor(title, price, img){
        this.title = title
        this.price = price
        this.img = img
        this.id = uuidv4()
    }

    async save() {
        const items = await Item.getAll()
        items.push(this.toJSON())
        return new Promise ((resolve, reject)=>{
            fs.writeFile(
                path.join(__dirname,'..','data','items.json'),
                JSON.stringify(items),
                (err) => {
                    if (err) { reject(err) 
                    } else { resolve(
                    )}
                }
            )
        })
    }

    toJSON() {
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        }
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname,'..','data','items.json'), 
                'utf-8', 
                (err, content) => {
                    if (err) { reject(err)} 
                    else {resolve(JSON.parse(content))}
                }
            )
        })
    }
}

module.exports = Item