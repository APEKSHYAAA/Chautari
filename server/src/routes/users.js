const express = require('express')
const {registerNewUser,loginUser , getAllUsers, getChatSenderReceiver} = require('../controllers/users')
router = express.Router();
router.post('/register',registerNewUser )
router.post('/login', loginUser)
router.get('/userList', getAllUsers);
router.get('/chats', getChatSenderReceiver);
module.exports = router
