const UserSchema = require('../models/user');

module.exports = (req, res, next) => {

    UserSchema.findOne({email:req.body.email}).then((user)=> {

    let errArray = [];

    if(req.body.name.length <= 3){
        errArray.push("Name should contain at least 3 letters");
    }






        var emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!(emailRE.test(String(req.body.email).toLowerCase()))) {
            errArray.push("Bad email");
            console.log("Bad email");
        }else if(user){
            errArray.push("This email already taken");
            console.log("already taken");
        }



    if(req.body.password.length <= 6){
        errArray.push("password is too short");
    } else if(!(/\d/.test(req.body.password))){
        errArray.push("password should contain at least one number");

    }


    if(errArray.length !== 0){
        res.status(401).json({
            message: "err",
            errors: errArray
        });
    }else{
        return next();
    }



    });

};