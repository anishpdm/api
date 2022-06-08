const router = require('express').Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
let User = require('../models/user.modal');
let Payments = require('../models/payments.modal');
const multers3 = require("multer-s3");
const aws = require("aws-sdk");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}


const s3config = new aws.S3(
    {
    accessKeyId: "AKIAYGNFKRTI2ZKKIBVV",
    secretAccessKey: "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"
    }
);


// let upload = multer({ storage, fileFilter });
const uploads3 = multer({
    storage: multers3({
      s3: s3config,
      bucket: 'linkurcodes',
    //   acl:"public-read",
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
      }
    }),
    limits:{ fileSize: 3000000 },
  })
  



router.route('/viewall').get(async (req, res) => {
   

    let result = await User.find().exec();
    res.send(result)
          
});

// Access Key ID:
// AKIAYGNFKRTI2ZKKIBVV
// Secret Access Key:
// 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



router.route("/testupload").post((req,res)=>{
   
    const test=uploads3.single("photo")
    console.log(test)
    const photo = req.file.location;
    res.send(photo)

})

router.route('/add').post(uploads3.single('photo'), async (req, res) => {
    const name = req.body.name;
    const birthdate = req.body.birthDate;
    const photo = req.file.location;

  

    const academicYear = req.body.academicYear;
    const semester = req.body.semester;
    const college = req.body.college;
    const admno = req.body.admno;
    const gender = req.body.gender;
    const mobile = req.body.mobile;
    const email = req.body.email;
    const address = req.body.address;
    const bloodGroup = req.body.bloodGroup;
    const paymentId=req.body.paymentId
    const dept=req.body.dept

    const newUserData = {
        name,
        birthdate,
        photo,
        academicYear,
            semester,
            college,
            admno,
            gender,
            mobile,
            email,
            address,
            bloodGroup,
            dept

    
        }


      

        console.log(newUserData)
    const newUser = new User(newUserData);

    await newUser.save(

        (error,data)=>{
            if(error)
            {
       res.json({"user status":error})
            }
            else{

                // res.json({"status":"user added","data":data})
                const getUid=data._id.toString()
                console.log(getUid)
                const dataTostore={"userId":getUid,"paymentId":paymentId}
                console.log(dataTostore)

let paymentInfo=new Payments(dataTostore)

console.log("-------")
console.log(paymentInfo)
paymentInfo.save(
    (error,data)=>{
        if(error)
        {
            res.json({"status":error})

        }
        else{
            res.json({"status":"success","data":data})

        }
    }
)




            }
        }
    )
          
});

module.exports = router;