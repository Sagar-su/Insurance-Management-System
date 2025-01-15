const express = require('express');
const { getClaims,addClaim,claimStatusUpdate } = require('../controllers/claimsController');
const  verifyToken = require('../middlewares/verifyToken')
const router =  express.Router();

router.get('/',verifyToken,getClaims);
router.post('/',verifyToken,addClaim);
router.patch('/',verifyToken,claimStatusUpdate)
module.exports = router