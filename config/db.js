const dotenv=require('dotenv')
const mongoose = require('mongoose')
dotenv.config()
const use ="mongodb+srv://inShare:wp1ksHDbDNoGBplT@cluster0.ce29i.mongodb.net/inShare?retryWrites=true&w=majority"
function connectDB(){
    mongoose.connect(use)
    const connection=mongoose.connection
   connection.once('open', function () {
      console.log('MongoDB connected');
    })
    .on('error', function (err) {
      console.log('err');
    })
}
module.exports=connectDB