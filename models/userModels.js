const {dbConnection,sql,closeDbConnection} = require('../db_config/db');
const client = require('../client');
const usersData=async()=>{
    try{
        
            await dbConnection();
            const usersData= await sql.query `SELECT * FROM wUsers`;
            await client.set("usersData",JSON.stringify(usersData.recordset))
            return usersData.recordset;

        
        
    }
    catch(error){
        return error.message;
    }
    finally{
        await closeDbConnection();
    }
}

const registerUser = async(userData)=>{
    try{
        const {userId, name,email,password,age,income,phone,role}=userData;
        await dbConnection();
        await sql.query`INSERT INTO S_UsersTable(userId,name,email,passcode,age,income,phone,role) VALUES (${userId},${name},${email},${password},${age},${income},${phone},${role})`
        
        
        await usersData();
        // console.log("all usersData:",allUsersData);
        
        // await client.set('usersData',JSON.stringify(allUsersData))

        
        return "User Registered Successfully"
        
        

    }catch(err){
        return err.message;
    }
    finally{
        await closeDbConnection();
    }

}

const getUserByEmail= async(email)=>{
    try{
        const result = await client.get('usersData');
        if(result){

            const usersDataR = JSON.parse(result)
            const user = usersDataR.find(user=>user.email === email);
            
                return user;
            
        }
        else{
            const allUsersData = await usersData();
            const userData = allUsersData.find(user=>user.email === email);
            
                return userData;
        }
        
        
        
            
            
        

        
    }
    catch(error){
        return error;
    }
    

}
const getUserById = async(userId)=>{
    try{
        const result = await client.get('usersData');
        if(result){

            const usersDataR = JSON.parse(result)
            const user = usersDataR.find(user=>user.userId === userId);
            
                return user;
            
        }
        else{
            const allUsersData = await usersData();
            const userData = allUsersData.find(user=>user.userId === userId);
            
                return userData;
        }
    }
    catch(error){
        return error;
    }
    
}
const deleteUserById=async(userId)=>{
    try{

        const allUsersData = await usersData();
        await dbConnection();
        const userData = allUsersData.find(user=>user.userId === userId);
        if(userData){
            const query=await sql.query`DELETE FROM S_UsersTable WHERE userId = ${userId}`
            const updatedUsers = await usersData();
            await client.set('usersData',JSON.stringify(updatedUsers))
            return "User Deleted successfully"

        }
        else{
            return "User Not Found";
        }        
        
    }
    catch(error){
        console.log(error);
        
        return error;
    }
    finally{
        await closeDbConnection();
    }
}




module.exports={
    
    usersData,
    registerUser,
    getUserByEmail,
    getUserById,
    deleteUserById
}