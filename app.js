const express=require("express")
const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const cors=require("cors")
const loginModel = require("./models/admin")
const jwt = require("jsonwebtoken")
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

//************************adminSignIn********
app.post("/adminSignIn",(req,res)=>{
    let input=req.body
    let result=loginModel.find({username:input.username}).then(
        (response)=>{
            if (response.length>0) {
                const validator=bcrypt.compareSync(input.password,response[0].password)
                if (validator) {
                    jwt.sign({email:input.username},"rescue-app",{expiresIn:"1d"},
                    (error,token)=>{
                        if (error) {
                            res.json({"status":"token creation failed"})
                            
                        } else {
                            res.json({"status":"success","token":token})
                            
                        }
                    })
                    
                } else {
                    res.json({"status":"Wrong password"})
                }
                
            } else {
                res.json({"status":"Invalid Authentication"})
            }
        }
    ).catch()
})


app.listen(5050,()=>{
    console.log("server started")
})