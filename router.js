var express= require('express');

var router= express.Router();

const credential= {
    email: "admin@gmail.com",
    password: "admin123"
}

// LOGIN USER
router.post('/login',(req,res)=>{

    if(req.body.email===credential.email && req.body.password=== credential.password){
        // create a new session with variable name email
        req.session.user= req.body.email;
        res.redirect('/route/dashboard'); // direct to dashboard ejs
        //res.end("login successful");
    }
    else{
        res.end("Invalid User");
    }
    
});

// ROUTE FOR DASHBOARD
router.get("/dashboard",(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user: req.session.user});
    }
    else{
        res.send("Unauthorized user");

    }
});

// ROUTE FOR LOGOUT
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("error");
        }
        else{
            res.render('base',{title: "Express", logout:"LOGOUT SUCCESSFUL"});
        }
    });

})

module.exports= router;