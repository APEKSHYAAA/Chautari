const mongoose = require('mongoose')
const connection = async()=>{
    try{
        const res =  await mongoose.connect('mongodb://127.0.0.1:27017/chatDb');
        if(res) console.log('connected to mongodb')
    }catch(err){
        console.log(err)
    }
}
 
module.exports = connection //connecting to mongoose