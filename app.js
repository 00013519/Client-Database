const express = require('express')
const app = express()


app.use('/', express.static('./views'))

app.get('/', (req, res) => {
    res.send('hello gul')
})



console.log('hello world')

app.listen(3000, (req, res) => {
    console.log('listening on port 3000...');
})