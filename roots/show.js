const router = require('express').Router()
const File = require('../models/file')

router.get('/:uuid', async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid })
        if(!file){
            return res.render('download',{error:'Link has been expired..'})
        }
        console.log(file)
        return res.render('download',{
            uuid:file.uuid,
            filename:file.filename,
            filesize:file.size,
            downloadLink: `${"http://localhost:3000"}/files/download/${file.uuid}`
        })
    }catch(err){
            console.log(err)
            return res.render('download',{error:'Something went wrong..'})
    }
})


module.exports = router