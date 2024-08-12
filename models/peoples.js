const mongoose=require("mongoose")
const peopleSchema=mongoose.Schema(
    {
        name:String,
        phno:String,
        village:String,
        place:String,
        pincode:String,
        house_no:String,
        gender:String,
        age:String
    }
)
const peopleModel=mongoose.model("people",peopleSchema)
module.exports=peopleModel