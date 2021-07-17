const path = require('path')
const fs = require('fs')
const { resolve } = require('path')
const { rejects } = require('assert')

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'card.json'
)


class Card {
   static async add(item){
    const card = await Card.fetch()
    const idx = card.items.findIndex(c => c.id === item.id)
    const candidate = card.items[idx]
    
    if(candidate){
        candidate.count++
        card.items[idx] = candidate
    } else{
        item.count = 1
        card.items.push(item)
    }

    card.price += +item.price

    return new Promise((resolve, reject) => {
        fs.writeFile(p, JSON.stringify(card), err=>{
            if (err){
                reject(err)
            } else {
                resolve()
            }
        })
    })
   } 

   static async remove(id){
       const card = await Card.fetch()

       const idx = card.items.findIndex(c=> c.id ==id)
       const item = card.items[idx]

       if (item.count === 1){
           card.items = card.items.filter(c=> c.id !== id)
       } else {
           card.items[idx].count--
       }
       card.price -= item.price

       return new Promise((resolve, reject) => {
        fs.writeFile(p, JSON.stringify(card), err=>{
            if (err){
                reject(err)
            } else {
                resolve(card)
            }
        })
    })
   }

   static async fetch(){
     return new Promise((resolve,reject)=>{
         fs.readFile(p,'utf-8',(err, content)=>{
             if(err){
                 reject(err)
             } else {
                 resolve(JSON.parse(content))
             }
         })
     })
   }
}


module.exports = Card