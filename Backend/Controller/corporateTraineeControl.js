const router = require('express').Router();
let CorporateTrainee = require('../Models/CorporateTrainee');

router.get('/',(req,res) =>{
    CorporateTrainee.find()
    .then(corporateTraineeControl => res.json(corporateTraineeControl)).catch(err => res.status(400).json('Error:'+err));
});

router.post('/add',(req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const newCorporateTrainee = new CorporateTrainee({username,password});
    newCorporateTrainee.save()
    .then(()=>res.json('Corporate Trainee Added')).catch(err => res.status(400).json('Error:'+err));
});
module.exports = router;