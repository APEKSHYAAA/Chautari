const mongoose = require('mongoose')
const { Schema } = mongoose;
//creating schema 
const userschema = new Schema({
  email: {type: String , unique: true}, 
  password: String,
  firstName: String,
  lastName: String,
  role: {
    type: String,
    enum : ['User'],
    default: 'User'
    }
});

const User = mongoose.model('User', userschema);
module.exports = User
