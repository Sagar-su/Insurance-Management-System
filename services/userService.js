const {usersData,getUserById} = require('../models/userModels')
const client = require('../client');
const listAllUsers = async()=>{
        const result = await client.get('usersData');
        if(result){
            return JSON.parse(result);
        }
        else{
            const allUsersData = await usersData();
            return allUsersData;


        }

}
const userData = async(userId ,tokenData )=>{
    const {email,role} = tokenData
    // console.log(email);
    
    
    const userData = await getUserById(userId);
    console.log(userData);
    
    if(role === "Admin" || email === userData.email){
        return userData;
    }
    else{
        return "Invalid User Data"
    }
    

}
// userData("dae047d2-6056-4b0b-abd7-ba39e9485665")
    


module.exports = {
    listAllUsers,
    userData
}