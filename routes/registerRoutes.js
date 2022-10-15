const express = require('express');
const router = express.Router(); 

//Importing Model
const Registration = require('../models/User');
// writing a route
router.get('/register',(req,res) =>{
    console.log(req);
res.render('patients_register')
});

router.post('/register', async (req,res) =>{
    console.log(req.body);
try {
const user = new Registration(req.body);
await Registration.register(user, req.body.password, (error) => {
if(error){
    throw error
}
res.redirect('/home')
});
}
catch(error){
res.status(400).send('Sorry something went wrong');
console.log(error)
}

})
//This is a must, you must first export the route and must be the last line in the file.
module.exports = router;