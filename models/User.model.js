const mongoose=require('mongoose')
const bcrypt=require('bcrypt');
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name can't be empty."]
    },
    email:{
        type:String,
        required:[true,"Email can't be empty."]
    },
    contact:{
        type:Number,
        required:[true,"Contact can't be empty."]
    },
    password:{
        type:String,
        required:[true,"Password can't be empty."]
    }
},
{
    collection:"turnkey-users"
}
)
UserSchema.pre('save',async function(next){
    const hashed_password=await bcrypt.hash(this.password,10)
    this.password=hashed_password
    next()
})
module.exports = mongoose.model("UserSchema",UserSchema)