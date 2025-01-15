const express = require('express');
const {userSignupInput}= require('../middlewares/loginmiddleware');
const { userSignup,userLogin } = require('../controllers/authController');

const router = express.Router();

router.post('/signUp',userSignupInput,userSignup);
router.post('/login',userLogin);

module.exports = router