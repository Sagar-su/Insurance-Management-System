const express = require('express');
const { getAllPolicies,addNewPolicy } = require('../controllers/policiesController');
const  verifyToken = require('../middlewares/verifyToken')
const router = express.Router();

router.get('/',getAllPolicies);
router.post('/',verifyToken,addNewPolicy)
module.exports = router;