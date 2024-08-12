const mongoose=require("mongoose")

const viewSchema=mongoose.Schema(
    {
      userId:{
        type:mongoose.Schema.Types.ObjectId,

        ref:"people"

      },
      name:String,
      age:String,
      gender:String
    }
)

var viewModel=mongoose.model("view",viewSchema)
module.exports=viewModel