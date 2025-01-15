const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../.env'});
const {getUserByEmail} = require('../models/userModels')
const adminCheck = require('../models/adminModel')
const assignTokenUser = async(loginInput)=>{
    try{
        const {email,password} = loginInput
        const checkResult = await getUserByEmail(email);
        
        
        if(checkResult){
            
            if(checkResult.passcode === password){
                const {name,phone,age,passcode,income,...tokenData} = checkResult
                const token = jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{ expiresIn: '2h' })
                return token;
            }
            else{
                return "Wrong Password"
            }
        }
        else{
            return "User Does not Exist";
        }
    }
    catch(error){
        return error;
    }
}
const assignAdminToken = async(adminInput)=>{
    try{
        const {email,password}= adminInput;
        const result = await adminCheck(email);
        
        
        if(result){
            if(result.password === password){
                const token = jwt.sign(result,process.env.JWT_SECRET_KEY,{ expiresIn: '1h' })
                
                
                return token;
            }
            else{
                return "Wrong Credentials"
            }
        }
        else{
            return "Email not found"
        }

     }
     catch(error){
        return error;
     }
}

module.exports = {
    assignTokenUser,
    assignAdminToken
}

