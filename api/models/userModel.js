const {mongoose,Schema} = require("mongoose");

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        default:false
    },
    verificationToken:{
        type:String,
    },

    addresses:[
        {
            name:String,
            mobileNo:String,
            houseNo:String,
            street:String,
            landmark:String,
            city:String,
            country:String,
            postalCode:String
        }
    ],
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order"
    }
], 
 CreatedAt:{
    type:Date,
    default:Date.now,
 }
})

const User = mongoose.model("User",userSchema);

module.exports = User;