const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

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
router.post('/authenticate', (req, res)=>{
  const username = req.body.username;
  const password = req.body.password;
  User.gerUserByUsername(username, (err, user)=> {
    if(err) throw err;
    if(!user){
      return res.json({success: false, message: 'User not found'});
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 //one week
        });
        res.json({
          success: true,
          token: 'JWT ' + token,
          user:{
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, message: 'Wrong Password'});
      }
    });
  });
  // res.send('This is the AUTHENTICATE route');
});

//Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res)=>{
  res.json({user: req.user});
  // res.send('This is the PROFILE route');
});

//Validate
router.get('/validate', (req, res)=>{
  res.send('This is the VALIDATE route');
})


module.exports = router;
