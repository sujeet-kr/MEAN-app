const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');


const User = require('../models/user');



//Register
router.post('/register',(req, res)=>{
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });
  User.addUser(newUser, (err, user) => {
    if (err){
      res.json({success: false, message: 'Failed to register user'});
    } else {
      res.json({success: true, message: 'User registerd successfully'})
    }
  });
});

//Authenticate
router.get('/authenticate', (req, res)=>{
  res.send('This is the AUTHENTICATE route');
});

//Profile
router.get('/profile', (req, res)=>{
  res.send('This is the PROFILE route');
});

//Validate
router.get('/validate', (req, res)=>{
  res.send('This is the VALIDATE route');
})


module.exports = router;
