const express = require('express')
const router = express.Router()
const fs = require('fs')


router.get('/', (req,res)=>{
    res.render('create', {create: true})
})


router.post('/', (req,res) => {
    const name = req.body.name
    const age = req.body.age
    const description = req.body.description

    if(name.trim() === '' || age.trim() === '' || description.trim() === ''){
        return res.render('create', {error:true})
    }
    else{
        fs.readFile('./data/clients.json', (err, data)=>{
            if(err) throw err

            const clients = JSON.parse(data)

            clients.push({
                id: id(),
                name: name,
                age: age,
                description: description
            })
            fs.writeFile('./data/clients.json', JSON.stringify(clients), err =>{
                if(err) throw err

                res.render('home', {success: true})
            })
        })
    }
})
function id() {
    return '_' + Math.random().toString(36).substring(2, 9);
}
module.exports = router
