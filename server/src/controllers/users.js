const User = require('../models/users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const registerNewUser = async(req, res) => {
  try{
    const existingUser = await  User.findOne({email: req.body.email})
    //if user email already exist, return 403, else create User doc
    if(existingUser){
     return res.status(403).json({
          msg: "User already exist"
      })
    }else{
      const hashPassword = await bcrypt.hash(req.body.password, saltRounds)
      req.body.password = hashPassword
      await User.create(req.body)
      res.json({
        msg: "registered successfully"
      })
    }
  }catch(err){
    console.log(err)
  }
}



const loginUser = async (req, res) => {
  try {
    const userDetails = await User.findOne({ email: req.body.email });
    if (userDetails) {
      const matched = await bcrypt.compare(
        req.body.password,
        userDetails.password
      );
      if (matched) {
        const token = jwt.sign(
          { email: userDetails.email },
          process?.env.secret_key
        );
        return res.status(200).json({ msg: "Login Successfully", token, userDetails });
      } else {
        return res.status(403).json({ msg: "Password didn't match"});
      }
    } else {
      return res.status(401).json({ msg: "Email not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Login failed" });
  }
};

const getAllUsers =  async(req,res) => {
 
    const userList= await User.find();
    return res.json(userList);
  }
  


module.exports = {loginUser, registerNewUser , getAllUsers, }