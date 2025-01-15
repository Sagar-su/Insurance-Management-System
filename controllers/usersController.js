const {deleteUserById}  = require('../models/userModels')
const {listAllUsers,userData} = require('../services/userService')

const getAllUsers=async(req,res)=>{
    const decodedData = req.data;
    const usersData = await listAllUsers(decodedData)
    res.json(usersData);
    
    

}
const getUserData = async(req,res)=>{
    try{

        const userParam =req.params.userId;
        
        const tokenData = req.data;
        
        
        const result = await userData(userParam,tokenData);
        res.json(result)
    }
    catch(error){
        console.log(error);
        
    }
}
const deleteUser=async(req,res)=>{
    try{
        const userId = req.params.userId;
        
        
        const deletedUser = await deleteUserById(userId);
        res.json(deletedUser)
        
    }
    catch(error){
        res.json(error.message);
    }
}

module.exports = {
    getAllUsers,
    getUserData,
    deleteUser
}