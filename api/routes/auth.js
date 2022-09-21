const router = require("express").Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//Register
router.post("/register", async(req,res)=>{
    try{
        const hash = await bcrypt.hash(req.body.password,saltRounds);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password:hash,
        });
        const user = await newUser.save(function(err){
            if(err){
                console.log(err);
                res.json(err);
            }
            else{
                console.log("User Registered Successfully!");
                res.json(user)
            }
        });
    }
    catch(err){
        console.log(err);
    }
});


// Login
router.post("/login", async(req,res)=>{
    try{
        const username = await req.body.username;
        const password = await req.body.password;
        User.findOne({username:username}, function(err,foundUser){
            if(err){
                console.log(err);
            }
            else{
                if(foundUser){
                    bcrypt.compare(password,foundUser.password, function(err,result){
                        if(result==true){
                            console.log(("User logged in successfully!"));
                            res.json(foundUser);
                        }
                    });
                }
            }
        });
    }
    catch(err){
        console.log(err);
    }
});


module.exports = router;