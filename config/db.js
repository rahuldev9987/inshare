const dotenv=require('dotenv')
const mongoose = require('mongoose')
dotenv.config()
const use =process.env.MONGO_CONNECTION_URL
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