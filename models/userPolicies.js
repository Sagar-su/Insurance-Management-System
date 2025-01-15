const {dbConnection,sql,closeDbConnection} = require('../db_config/db');
const client = require('../client');


const getUserPolicies = async()=>{
    try {
        await dbConnection();
        const userPoliciesData = await sql.query`SELECT * FROM S_UserPoliciesTable`
        
        await client.set('usersPolicies',JSON.stringify(userPoliciesData.recordset));
        
        return userPoliciesData.recordset;
    } catch (error) {
        return error;
    }
    finally{
        await closeDbConnection();
    }
}
const assignPolicy =async(userPolicy)=>{
    try{
        await dbConnection();
        const { userPolicyId, policyId,userId, dateOfissue }= userPolicy;
        await sql.query`INSERT INTO S_UserPoliciesTable(UserPolicyId,policyId,userId,dateOfIssue) VALUES (${userPolicyId},${policyId},${userId},${dateOfissue})`
        await getUserPolicies();
        return "Policy Assigned Successfully"
    }
    catch(error){
        return error.message;
    }
    finally{
        await closeDbConnection();
    }

}


module.exports = {
    getUserPolicies,
    assignPolicy

}