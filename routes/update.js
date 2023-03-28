const express = require('express')
const router = express.Router()
const fs = require('fs')




router.get('/:id', (req,res)=>{
    const id = req.params.id
    fs.readFile('./data/clients.json',(err, data)=>{
        if(err) throw err
        const clients = JSON.parse(data)
        const client = clients.filter(client => client.id == id)[0]
        res.render('update', {client: client})
    })

})
router.post('/:id', (req, res)=>{
    const id = req.params.id
    const name = req.body.name
    const age = req.body.age
    const description = req.body.description

    if(name.trim() === '' || age.trim() === '' || description.trim() === ''){
        return res.render('update', {error:true})
    }
    else{
        fs.readFile('./data/clients.json', (err, data)=>{
            if(err) throw err

            const clients = JSON.parse(data)
            const client = clients.filter(client => client.id == id)[0]
            const clientIdx = clients.indexOf(client)
            const splicedClient = clients.splice(clientIdx, 1)[0]
            splicedClient.name = name
            splicedClient.age = age
            splicedClient.description = description
            clients.push(splicedClient)
            console.log(splicedClient);

            
            fs.writeFile('./data/clients.json', JSON.stringify(clients), err =>{
                if(err) throw err

                res.render('detail', {client: client, active: true, updated:true})
            })
        })
    }
})
module.exports = router