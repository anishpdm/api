const router = require('express').Router();

let College = require('../models/colleges.modal');


router.route('/viewall').get(async (req, res) => {
   

    let result = await College.find().exec();
    res.send(result)
          
});

router.route("/add").post(  async (req,res)=>{

    const college=req.body.college
    console.log(college)

    const newUserData = {
        college }

    let _college = new College(newUserData)
      console.log(_college)
      let result = await _college.save()
      res.send(result)
})


module.exports = router;