const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/:id', (req,res)=>{
    const id = req.params.id
    fs.readFile('./data/inactive.json', (err, data)=>{
        if(err) throw err
        const inactive_clients = JSON.parse(data)
        const filterClients = inactive_clients.filter(client => client.id != id)
        fs.writeFile('./data/inactive.json', JSON.stringify(filterClients), (err)=>{
            if (err) throw err

            res.render('clients', {clients: filterClients, deleted: true, inactive: true})
        })
    })
})

module.exports = router