const express=require("express")
const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const cors=require("cors")
const loginModel = require("./models/admin")
const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://shafnashakeersm:Shafna123@cluster0.2srguee.mongodb.net/rescuedb?retryWrites=true&w=majority&appName=Cluster0")

app.get("/test",(req,res)=>{
    res.json({"status":"success"})
})

//******************adminSignUp***********
app.post("/adminSignUp",(req,res)=>{
    let input=req.body
    //password have to hash
    let hashedpassword=bcrypt.hashSync(input.password,10)
    //console.log(hashedpassword)
    input.password=hashedpassword //to directly pass the input
    console.log(input)
    //to store in the database
    let result=new loginModel(input)
    result.save() //it store 
    res.json({"status":"success"})
})


app.listen(5050,()=>{
    console.log("server started")
})