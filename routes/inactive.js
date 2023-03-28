const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', (req,res)=>{
    fs.readFile('./data/inactive.json',(err, data)=>{
        if(err) throw err
        
        const inactive = JSON.parse(data)
        res.render('clients', {clients: inactive, inactive: true})


    })

})

router.get('/:id', (req,res)=>{
    const id = req.params.id
    fs.readFile('./data/inactive.json',(err, data)=>{
        if(err) throw err
        const clients = JSON.parse(data)
        const client = clients.filter(client => client.id == id)[0]
        res.render('detail', {client: client, inactive: true})


    })
})

module.exports = router