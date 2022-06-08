
const express = require('express')

const app = express();

app.listen(3001);

const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3');


aws.config.update({
    accessKeyId: "AKIAZYDC2S5UOIVSC5NG",
    secretAccessKey: "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",

    region :'ap-south-1',

});
const BUCKET = "linktestcodes"
const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        // acl: "public-read",
        bucket: BUCKET,
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname)
        }
    })
})

app.post('/upload', upload.single('file'), async function (req, res, next) {

    res.send('Successfully uploaded ' + req.file.location + ' location!')

})

