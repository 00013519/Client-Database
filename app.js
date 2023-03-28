const express = require('express')
const app = express()
const fs = require('fs')


app.set('view engine', 'pug')


app.use('/static', express.static('public'))
app.use(express.urlencoded({extended: false}))

app.get('/', (req,res) => {
    res.render('home')
})
app.get('/create', (req,res)=>{
    res.render('create')
})
app.post('/create', (req,res) => {
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

app.get('/clients', (req,res)=>{
    fs.readFile('./data/clients.json',(err, data)=>{
        if(err) throw err
        
        const clients = JSON.parse(data)
        res.render('clients', {clients: clients, active: true})


    })

})
app.get('/inactive', (req,res)=>{
    fs.readFile('./data/inactive.json',(err, data)=>{
        if(err) throw err
        
        const inactive = JSON.parse(data)
        res.render('clients', {clients: inactive, inactive: true})


    })

})

app.get('/clients/:id', (req,res)=>{
    const id = req.params.id
    fs.readFile('./data/clients.json',(err, data)=>{
        if(err) throw err
        const clients = JSON.parse(data)
        const client = clients.filter(client => client.id == id)[0]
        res.render('detail', {client: client, active: true})


    })
})
app.get('/inactive/:id', (req,res)=>{
    const id = req.params.id
    fs.readFile('./data/inactive.json',(err, data)=>{
        if(err) throw err
        const clients = JSON.parse(data)
        const client = clients.filter(client => client.id == id)[0]
        res.render('detail', {client: client, inactive: true})


    })
})
app.get('/inactivate/:id', (req,res)=>{
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
app.get('/delete/:id', (req,res)=>{
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
// pp.get('/inactivate/:id', (req,res)=>{
//     const id = req.params.id
//     fs.readFile('./data/notes.json', (err, data)=>{
//         if(err) throw err
//         const notes = JSON.parse(data)
//         const filterNotes = notes.filter(note => note.id != id)
//         fs.writeFile('./data/notes.json', JSON.stringify(filterNotes), (err)=>{
//             if (err) throw err

//             res.render('notes', {notes: filterNotes, deleted: true})
//         })
//     })
// })


app.listen(3000, err => {
    if (err) console.log(err)

    console.log('listening on port 3000...');
})
function id() {
    return '_' + Math.random().toString(36).substring(2, 9);
}