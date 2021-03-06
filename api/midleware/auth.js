const jwt = require('jsonwebtoken');

module.exports = ((req, res, next) =>{

		const token = req.headers.authorization.split(" ")[1];

		jwt.verify(token, process.env.JWT_PASSWORD, function(err, decoded) {
		  if(!err){
		  	req.body.userID = decoded.userId;
		  	return next();		
		  }else{

		  	res.status(401).json({
		  		message : "user not authenticated"
		  	});
		  }
	});

});