const express = require('express');
const {allUserPolicies,newUserPolicy}= require('../controllers/userPoliciesController') 
const  verifyToken = require('../middlewares/verifyToken')
const router = express.Router();

router.get('/',verifyToken,allUserPolicies)
router.post('/',verifyToken,newUserPolicy)

module.exports = router