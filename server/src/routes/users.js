const express = require('express')
const {registerNewUser,loginUser , getAllUsers} = require('../controllers/users')
router = express.Router();
router.post('/register',registerNewUser )
router.post('/login', loginUser)
router.get('/userList', getAllUsers);
module.exports = router
