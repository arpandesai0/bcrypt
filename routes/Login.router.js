const router=require('express').Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const UserSchema=require('../models/User.model')


router.get('/',(req,res)=>res.status(405).send("Method not allowed."));
router.post("/",async (req,res)=>{
    const {email,password}=req.body;
    // const auth_header=req.headers["authorization"];
    // if(!auth_header) return res.status(401).send({error:"Unauthorized"})
    try{
        var user=await UserSchema.findOne({email});
        if(!user) return res.status(404).json({error:"Enter a valid email id"})
        user=JSON.parse(JSON.stringify(user));
        if(await bcrypt.compare(password,user.password)){
            const access_token=jwt.sign({user},process.env.ACCESS_TOKEN_SECRET)
            res.status(200).json({access_token})
        }else{
            res.status(403).json({error:"Enter valid password"})
        }
    }catch(err){
        return res.status(500).json()
    }
})
module.exports=router;