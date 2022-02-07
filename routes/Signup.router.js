const router=require('express').Router();
const UserSchema=require('../models/User.model')


router.get('/',(req,res)=>res.status(405).send("Method not allowed."));
router.post('/',async (req,res)=>{
    const {name,email,contact,password}=req.body;
    try{
        const isEmailUsed=await UserSchema.findOne({email});
        if(isEmailUsed){
            return res.status(406).json({error:"Email id alreay used."})
        }
        const user = await UserSchema.create({name,email,contact,password})
        return res.status(201).json(user)
    }catch(err){
        // console.log(err);
        // const error = JSON.parse(JSON.stringify(err)).errors
        // const errors=[]
        // Object.keys(error).map((item)=>{
        //     errors.push(error[item].message)
        // })
        return res.status(406).json({error:"Enter valid details"})
    }
})

module.exports=router;