const client = require('../client');
const {dbConnection,sql,closeDbConnection} = require('../db_config/db');

const getAllClaims =  async()=>{
    try{
        await dbConnection();
        const claimsData = await sql.query`SELECT * FROM S_ClaimsTable`
        await client.set('claimsData',JSON.stringify(claimsData.recordset))
        console.log(claimsData);
        
        
        return claimsData.recordset;
    } 
    catch{

    }
    finally{
        await closeDbConnection()
    }
}

const raiseClaim = async(claimData)=>{
    try {
        await dbConnection()
        const {claimId,userPolicyId,userId,policyId,dateOfClamRaised,status} = claimData
        await sql.query`INSERT INTO S_ClaimsTable(claimId,UserPolicyId,userId,policyId,dateOfClaimRaised,status) VALUES (${claimId},${userPolicyId},${userId},${policyId},${dateOfClamRaised},${status})`

        const updatedclaims= await getAllClaims();
        await client.set('claimsData',JSON.stringify(updatedclaims))
        return "Claim Raised Successfully";
    } catch (error) {
        return error.message;
    }
    finally{
        await closeDbConnection()
    }
}
const claimUpdate = async(claimData)=>{
    try{
        
        const { claimId,status } = claimData;
        await dbConnection();
        await sql.query`UPDATE S_ClaimsTable SET status = ${status} WHERE claimId = ${claimId}`
        const updatedClaims = await getAllClaims() ;
        await client.set('claimsData',JSON.stringify(updatedClaims));
        return "Claim Status Updated Successfully";


    }
    catch(error){

    }
    finally{
        await closeDbConnection()
    }
}
module.exports = {
    getAllClaims,
    raiseClaim,
    claimUpdate
}