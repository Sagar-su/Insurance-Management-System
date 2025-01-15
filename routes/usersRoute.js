const express = require('express');
const { getAllUsers,deleteUser,getUserData} = require('../controllers/usersController');
const  verifyToken = require('../middlewares/verifyToken')
const isAdmin = require('../middlewares/isAdmin')
const router = express.Router();

router.get('/',verifyToken,isAdmin,getAllUsers);
router.get("/:userId",verifyToken,getUserData)
router.delete('/:userId',deleteUser);
module.exports = router