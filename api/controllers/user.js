const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Email = require('email-templates');


const UserSchema = require('../models/user');

const Keys = require('../../secretKey');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(Keys.sendGrid.password);



module.exports.SINGUP = (req, res)=>{

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {

            const user = new UserSchema({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                userSecretKey: ""
            });

            user.save().then(()=>{

                                
                            res.status(201).json({
                            message: 'user saved'
                                });


            }).catch(()=>{
                res.status(500).json({
                    message: 'user not saved'
                });
            });
        });

    });

};

module.exports.LOGIN = (req, res)=>{

    bcrypt.genSalt(10, function(err, salt) {

        UserSchema.findOne({email: req.body.email}).then(user=>{

            if(!user){
                res.status(401).json({
                    message: 'bad email or password'
                });
            }else {


                bcrypt.compare(req.body.password, user.password, function (err, response) {

                    if (response) {


                             const token = jwt.sign({
                                email: user.email,
                                userId: user._id
                            },
                            'password',
                            {
                                expiresIn: '1h'
                            },
                            {
                                algorithm: 'RS256'
                            });


                             res.status(201).json({
                                jwt : token
                             });



                        
                    } else {
                        res.status(401).json({
                            message: 'bad email or password'
                        });
                    }

                });
            }

        }).catch(()=>{
            res.status(401).json({
                message: 'bad email or password'
            });
        });

    });

};


module.exports.SET_USER_SECRET_KEY_AND_SEND_EMAIL = (req, res)=>{


  var generatedKey = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 40; i++){
    generatedKey += possible.charAt(Math.floor(Math.random() * possible.length));
        }


    UserSchema.updateOne({email : req.body.email}, {userSecretKey : generatedKey})
    .then((result)=>{
        
      

                         const msg = {
                          to: req.body.email,
                          from: 'noreplay@to-do-app.com',
                          subject: 'Recreate password',
                          text: 'text',
                          html: '<strong>Enter this link to recreate password</strong>  <a href="http://localhost:3000/newPassword/'+generatedKey+'">Recreate password</a>'
                        };
                            


                        sgMail.send(msg).then(()=>{

                                
                            res.status(201).json({
                            message: 'email sent'
                                });

                        });

    })
    .catch();

 };


module.exports.RECREATE_PASSWORD = (req, res)=>{




  bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.newPassword, salt, function(err, hash) {

            

            UserSchema.updateOne({userSecretKey : req.body.secID}, {userSecretKey: "", password : hash }).then(()=>{

            res.status(201).json({
            message : "password changed"
           });

         }).catch(()=>{
                res.status(401).json({
                message : "link is not active"
               });
         });

        });

    });

};



