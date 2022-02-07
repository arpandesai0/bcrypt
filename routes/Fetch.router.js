const jwt=require('jsonwebtoken')
const router=require('express').Router();
const UserSchema=require('../models/User.model')


router.post('/',(req,res)=>res.status(405).send("Method not allowed."));
router.get("/",async (req,res)=>{
    const auth_header=req.headers["authorization"];
    if(!auth_header) return res.status(401).send({error:"Unauthorized"})
    try{
        await jwt.verify(auth_header.split(" ")[1],process.env.ACCESS_TOKEN_SECRET,async(err,user)=>{
            return res.status(401).json(user.user)
            })
    }catch(err){
        return res.status(401).send({error:"Unauthorized"})
    }
})
module.exports=router;