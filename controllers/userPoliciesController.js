const {getUserPolicies,assignPolicy} = require('../models/userPolicies');
const { v4: uuidv4 } = require('uuid');
const client = require('../client');

const allUserPolicies = async(req,res)=>{
    const userPolicies = await client.get('usersPolicies');
    if(userPolicies){
        res.json(JSON.parse(userPolicies));
    }
    else{
        const userPolicies = await getUserPolicies();
        res.json(userPolicies);
    }
}
const newUserPolicy=async(req,res)=>{
    const newAssignedPolicy = req.body;
    const newUPolicyObject = {"userPolicyId":uuidv4(),...newAssignedPolicy,"dateOfissue": new Date()}
    const UpdatedUserPolicy = await assignPolicy(newUPolicyObject); 
    res.json(UpdatedUserPolicy);
}

module.exports = {
    allUserPolicies,
    newUserPolicy
}