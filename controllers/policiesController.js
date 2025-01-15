const {policiesData,addPolicies} = require('../models/policiesModel')
const { v4: uuidv4 } = require('uuid');
const client = require('../client');

const getAllPolicies=async(req,res)=>{
    const result = await client.get('policiesData');
    if(result){
        res.json(JSON.parse(result))
    }
    else{
        const allPolicies = await policiesData();
        res.json(allPolicies)

    }

}
const addNewPolicy=async(req,res)=>{
    const newPolicy= req.body;
    const newPolicyObject = {"policyId": uuidv4(),...newPolicy}
    const newPolicyData = await addPolicies(newPolicyObject);
    res.json(newPolicyData);
}
module.exports = {
    getAllPolicies,
    addNewPolicy
}