const file = require('./models/file')
const fs = require('fs')
const connectDB=require('./config/db')

async function fetch(){
    const pastDate= new Date(Date.now()-24*60*60*1000);
    const files =await File.find({createAt:{$lt:somedate }})
    if(files.length){
        for(const file of files){
            try{
                fs.unlinkSync(file.path)
            await file.remove(); 
            console.log(`successfully Deleted${file.filename}`);
            }catch(err){
                console.log(`error while deleting file ${err}`)
            }
        }
      
        console.log('Job Done!')
    }
}
fetchdata().then(process.exit)