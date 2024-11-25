const express = require('express');
const app = express();
const morgan = require('morgan'); 
const AppError = require('./AppError')

app.use(morgan('tiny'));
app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

const verifyPassword = (req, res , next)=>{
    const {password} = req.query;
    if(password === 'chicken'){
        next();
    }
    throw new AppError('Password required', 401)
}

// app.use((req, res , next)=>{
//     const {password} = req.query;
//     if(password === 'chicken'){
//         next();
//     }
//     else{
//         res.send('wrong password')
//     }
// })

app.use('/dogs',(req,res, next) =>{
    console.log('/dogs middleware')
    next();
})
app.get('/secret',verifyPassword,(req,res)=>{
    res.send('fishpie')
})

app.get('/admin', (req,res)=> {
    throw new AppError('Not an admin', 403)
})

app.get('/', (req, res) =>{
    console.log(`request time : ${req.requestTime}`)
    res.send('home')
})
app.get('/dogs', (req, res) =>{
    console.log(`request time : ${req.requestTime}`)
    res.send('Woof')
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
});

app.listen(3000, () =>{
    console.log('listening on 3000')
})