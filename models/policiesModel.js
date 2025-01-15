const {dbConnection,sql,closeDbConnection} = require('../db_config/db');
const client = require('../client');

const policiesData=async()=>{
    try{
       
            await dbConnection();
            const policiesData= await sql.query `SELECT * FROM S_PoliciesTable`;
            await client.set("policiesData",JSON.stringify(policiesData.recordset))
            return policiesData.recordset;

        }
        
    catch(error){
        return error.message;
    }
    finally{
        await closeDbConnection();
    }
}
const addPolicies = async(newPolicyData)=>{
    try{
        await dbConnection()
        const {policyId,policyName,premium,duration}=newPolicyData;
        await sql.query`INSERT INTO S_PoliciesTable(policyId,policy_name,premium,duration) VALUES(${policyId},${policyName},${premium},${duration})`
        await policiesData();
        // await client.set('policiesData',JSON.stringify(updatedPoliciesData))
        return {
            "message":"Policy Added sucessful",
            newPolicyData
        }
    }
    catch(error){
        return error.message;
    }
    finally{
        await closeDbConnection();
    }
}

module.exports={
    
    policiesData,
    addPolicies
}