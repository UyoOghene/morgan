const express = require('express');
const app = express();
const morgan = require('morgan'); 

app.use(morgan('tiny'));
app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

app.use('/dogs',(req,res, next) =>{
    console.log('/dogs middleware')
    next();
})

app.get('/', (req, res) =>{
    console.log(`request time : ${req.requestTime}`)
    res.send('home')
})
app.get('/dogs', (req, res) =>{
    console.log(`request time : ${req.requestTime}`)
    res.send('Woof')
})

app.use((req, res)=>{
    res.status(404).send('NOT found')
})

app.listen(3000, () =>{
    console.log('listening on 3000')
})