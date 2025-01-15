const client = require('../client');
const { v4: uuidv4 } = require('uuid');
const {getAllClaims,raiseClaim,claimUpdate} = require('../models/claimsModel');

const getClaims = async(req,res)=>{
    const claimsDataR = await client.get('claimsData');
    if(claimsDataR){
        res.json(JSON.parse(claimsDataR))
    }
    else{
        const claimsData = await getAllClaims();
        res.json(claimsData) 
    }
} 
const addClaim = async(req,res)=>{
    const claimData = req.body;
    const claimDataObect={"claimId":uuidv4(),...claimData,"dateOfClamRaised":new Date(),"status":"Pending"};
    const updateclaims = await raiseClaim(claimDataObect);
    res.json(updateclaims);
}
const claimStatusUpdate= async(req,res)=>{
    const UpdateClaimStatus = req.body;
    const claimStatus= await claimUpdate(UpdateClaimStatus);
    res.json(claimStatus);
}
module.exports={
    getClaims,
    addClaim,
    claimStatusUpdate
}