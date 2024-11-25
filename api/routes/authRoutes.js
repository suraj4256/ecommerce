const express = require("express");
const router = express.Router();
const {registerUser,loginUser,verifyEmail,addAddress,fetchAddress} = require("../controller/authController");

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/verify/:token',verifyEmail);
router.post('/address', addAddress)
router.get('/getAddresses/:userId', fetchAddress)

module.exports = router;