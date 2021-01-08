var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var userHelper = require('../helpers/userHelper')
var tokenHelper = require('../helpers/tokenHelper')
var auth = require('../helpers/middlewares/auth')

/* GET home page. */
router.get('/', auth.checkToken, async(req, res, next) =>{
  console.log(`inside index route`)
  res.status(200).json({message:"Welcome to the home page"});
});

router.post('/register', async(req,res,next)=>{
  const{name,email,password}=req.body;

  const data ={
    name,
    email
  }
  const userExists=await userHelper.findByEmail(email)
  console.log(userExists);
  if(userExists) return res.status(403).json({"message":"User with same emailalready exists"})
  const hashpassword = await userHelper.hashpassword(password)
  
  if(!hashpassword) return res.status(500).json({"message": "Something went wrong"})
  data.password= hashpassword
  
  const result = await userHelper.create(data)
  console.log(result);
  if(!result) return res.status(500).json({"message":"something went wrong"})
  return res.status(200).json({"message":"user inserted successfully"})
});

router.post('/login',async(req,res,next)=>{
  const{email,password}=req.body;   
  if(!email || !password) return res.status(401).json({"message":"invalid username or password"})
  const data={
    email,
    password
  }

  const user = await userHelper.findByEmail(email)
  if(!user) return res.status(401).json({"message":"invalid credentials"})

  const isMatch = await userHelper.comparePassword(password,user.password)
  if(!isMatch) return res.status(401).json({"message":"invalid credentials"})

  const token = tokenHelper.generate({_id: user._id}, 30)
  res.json({token,name:user.name})
});
module.exports = router;
