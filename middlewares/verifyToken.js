const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../.env'});

const verifyToken = (req,res,next)=>{
    try{
        const tokenHeader = req.headers['authorization'];
        
        
        if(tokenHeader){
            
            
            const token  = tokenHeader.split(' ')[1];
            
            
            const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
            req.data = decode;
            next();
        }
        else{
            res.send("No token Found");
        }
        

    }
    catch(error){
        res.send(error.message);
    
        
    }
}


module.exports = verifyToken