const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/:id', (req,res)=>{
    const id = req.params.id
    fs.readFile('./data/clients.json', (err, data)=>{
        if(err) throw err
        const clients = JSON.parse(data)
        const filterClients = clients.filter(client => client.id != id)
        const client = clients.filter(client => client.id == id)[0]
        fs.readFile('./data/inactive.json', (err,data)=>{
            if(err) throw err
            const inactive = JSON.parse(data)
            inactive.push(client)
            fs.writeFile('./data/inactive.json', JSON.stringify(inactive), err =>{
                if(err) throw err
                fs.writeFile('./data/clients.json', JSON.stringify(filterClients), (err)=>{
                    if (err) throw err
        
                    res.render('clients', {clients: filterClients, inactivated: true, active: true})

                })
            })
        })
        
        
    })
})


module.exports = router