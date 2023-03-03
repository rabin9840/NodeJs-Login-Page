const express= require('express');
const path= require('path');
const app= express();
const bodyparser= require('body-parser');
const session = require('express-session');
const {v4:uuidv4}= require('uuid');

const router= require('./router');

const port= process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true})) 

//initialize the engine
app.set('view engine','ejs');

// load static asset
app.use('/static',express.static(path.join(__dirname, 'public')));

app.use(session({
    //secret:'secret',
    secret: uuidv4(),// to make session secret
    resave: false,
    saveUninitialized: true
}));

app.use('/route',router);


// HOME PAGE ROUTE
app.get('/',(req, res)=>{
    
    res.render('base',{title:'LOGIN SYSTEM'});
});

app.listen(port,()=>{
    console.log(`LISTENING TO THE SERVER ON PORT: ${port}`);
})