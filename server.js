const express = require('express')
const app = express()
const path=require('path')
const publicDir=path.join(__dirname,"/public")
const PORT = process.env.PORT || 3000
console.log(publicDir)


const connectDB = require('./config/db')
connectDB();
app.set('views',path.join(__dirname,'/views'))
app.set('view engine','ejs')
app.use(express.static(publicDir));
//routes
app.use(express.json())
app.use('/api/files',require("./roots/files"))
app.use('/files',require('./roots/show'))
app.use('/files/download',require('./roots/download'))

app.listen(PORT, () => {
    console.log(`listen on port:${PORT}`)
})