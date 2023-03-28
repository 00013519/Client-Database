const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', (req,res)=>{
    fs.readFile('./data/clients.json',(err, data)=>{
        if(err) throw err
        
        const clients = JSON.parse(data)
        res.render('clients', {clients: clients, active: true})
    })
})


router.get('/:id', (req,res)=>{
    const id = req.params.id
    fs.readFile('./data/clients.json',(err, data)=>{
        if(err) throw err
        const clients = JSON.parse(data)
        const client = clients.filter(client => client.id == id)[0]
        res.render('detail', {client: client, active: true})


    })
})
module.exports = router