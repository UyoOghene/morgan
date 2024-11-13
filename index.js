const express = require('express');
const app = express();
const morgan = require('morgan'); 

app.use(morgan('tiny'));

app.get('/', (req, res) =>{
    res.send('home')
})
app.get('/dogs', (req, res) =>{
    res.send('Woof')
})

app.listen(3000, () =>{
    console.log('listening on 3000')
})