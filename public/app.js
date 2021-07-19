const addingCurr = price => {
    return price +' manat'
}

document.querySelectorAll('.price').forEach(node=>{
    node.textContent = addingCurr(node.textContent)
})

const $card = document.querySelector('#card')
if($card){
    $card.addEventListener('click', event => {
        if (event.target.classList.contains('js-remove')){
            const id = event.target.dataset.id
            fetch('/card/remove/'+id, {
                method: 'delete',

            }).then(res => res.json())
            .then(card=>{
                if (card.items.length){
                    const html = card.items.map(c=> {
                        return ` <tr>
                        <td>${c.title}</td>
                        <td>${c.count}</td>
                        <td>
                            <button class="btn btn-small js-remove" data-id="${c._id}">Ygalimb</button>
                        </td>
                    </tr>`
                    }).join('')
                    $card.querySelector('tbody').innerHTML = html
                    $card.querySelector('.price').textContent = addingCurr(card.price)
                } else {
                    $card.innerHTML = '<p>Kopzina nycma</p>'
                }
            })
        }
    })
}