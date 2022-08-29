const router = require('express').Router();
const multer = require('multer')
const path = require('path')
const File = require('../models/file')
const { v4: uuid4 } = require('uuid')
const dotenv = require('dotenv')
dotenv.config()

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/")
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + ".jpg")
        }
    })
}).single("myfile")

router.post('/', upload, async (req, res) => {
    try {

        const file = new File({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size
        });
        const response = await file.save();
        console.log(response)
        res.json({ file: `http://localhost:3000/files/${response.uuid}` });
    } catch (error) {
        console.log(error)
    }

});
router.post('/send', async (req, res) => {
    const { uuid, emailTo, emailFrom } = req.body;
    console.log(req.body)
   
    const file = await File.findOne({ uuid: uuid })
    if (file.sender) {
        return res.status(422).send({ error: 'Email already Sent.' })
    }
    file.sender = emailFrom;
    file.receiver = emailTo;
    const response = await file.save();

    //send email

    const sendMail= require('../services/emailservice')
    try {
        sendMail({
            from:emailFrom,
            to:emailTo,
            subject:'inShare file sharing',
            text:`${emailFrom} Shared a file with you`,
            html:require('../services/emailTemplate')({
                emailFrom:emailFrom,
                downloadLink:`${'http://localhost:3000'}/files/${file.uuid}`,
                expires:'24 hours'
            })
        });
        return res.send({success:true})
    } catch (error) {
        console.log(error)
    }

})

module.exports = router