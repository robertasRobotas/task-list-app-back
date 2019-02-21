const UserSchema = require('../models/user');

module.exports = (req, res, next) => {

    UserSchema.findOne({email:req.body.email}).then((user)=> {

    let errArray = [];

        console.log(user);

        var emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!(emailRE.test(String(req.body.email).toLowerCase()))) {
            errArray.push("Bad email");
            console.log("Bad email");
        }else if(!user){
            errArray.push("This email not registred in this app");
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