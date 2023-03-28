const express = require('express')
const app = express()
const fs = require('fs')

const create = require('./routes/create.js')
const update = require('./routes/update.js')
const clients = require('./routes/clients.js')
const inactive = require('./routes/inactive.js')
const inactivate = require('./routes/inactivate.js')
const _delete = require('./routes/delete.js')


app.set('view engine', 'pug')

app.use('/static', express.static('public'))
app.use(express.urlencoded({extended: false}))

app.use('/create', create)
app.use('/update', update)
app.use('/clients', clients)
app.use('/inactive', inactive)
app.use('/inactivate', inactivate)
app.use('/delete', _delete)

app.get('/', (req,res) => {
    res.render('home')
})

app.listen(3000, err => {
    if (err) console.log(err)
    console.log('listening on port 3000...');
})
