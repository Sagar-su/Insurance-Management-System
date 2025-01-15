const {registerUser}= require('../models/userModels')
const {assignTokenUser,assignAdminToken} = require('../services/tokenService')
const { v4: uuidv4 } = require('uuid');

const userSignup=async(req,res)=>{
    const userData= req.body;
   
    const newUserData={"userId":uuidv4(),...userData,"role":"user"};
    const addUser= await registerUser(newUserData);
    
    
    res.json({
        
        "message":addUser,
        userData
    }
    );
}
const adminLogin=async(req,res)=>{
    const adminData = req.body;
    
    
    const result = await assignAdminToken(adminData);
    
    
    res.json(result);


     
}
const userLogin = async(req,res)=>{
    const userInput = req.body;
    const result = await assignTokenUser(userInput);
    res.json(result);
}


module.exports = {
    userSignup,
    userLogin,
    adminLogin
}