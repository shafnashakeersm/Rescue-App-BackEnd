const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const cors = require("cors")
const loginModel = require("./models/admin")
const jwt = require("jsonwebtoken")
const peopleModel = require("./models/peoples")
const viewModel = require("./models/view")
const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://shafnashakeersm:Shafna123@cluster0.2srguee.mongodb.net/rescuedb?retryWrites=true&w=majority&appName=Cluster0")

app.get("/test", (req, res) => {
    res.json({ "status": "success" })
})

//******************adminSignUp***********
app.post("/adminSignUp", (req, res) => {
    let input = req.body
    //password have to hash
    let hashedpassword = bcrypt.hashSync(input.password, 10)
    //console.log(hashedpassword)
    input.password = hashedpassword //to directly pass the input
    console.log(input)
    //to store in the database
    let result = new loginModel(input)
    result.save() //it store 
    res.json({ "status": "success" })
})

//************************adminSignIn********
app.post("/adminSignIn", (req, res) => {
    let input = req.body
    let result = loginModel.find({ username: input.username }).then(
        (response) => {
            if (response.length > 0) {
                const validator = bcrypt.compareSync(input.password, response[0].password)
                if (validator) {
                    // res.json({"status":"success"})
                    jwt.sign({ email: input.username }, "rescue-app", { expiresIn: "1d" },
                        (error, token) => {
                            if (error) {
                                res.json({ "status": "token creation failed" })

                            } else {
                                res.json({ "status": "success", "token": token })

                            }
                        })

                } else {
                    res.json({ "status": "Wrong password" })
                }

            } else {
                res.json({ "status": "Invalid Authentication" })
            }
        }
    ).catch()
})

//************************addpeople********
app.post("/addpeople", (req, res) => {
    let input = req.body
    let token=req.headers.token
    jwt.verify(token,"rescue-app",(error,decoded)=>{
        if (decoded &&decoded.email) {
            let result=new peopleModel(input)
            result.save()
            res.json({"status":"success"})
        } else {
            res.json({"status":"Invalid Authentication"})
            
        }
    })
})


//******************* viewAll************
app.post("/viewAll",(req,res)=>{
    let token=req.headers.token
    jwt.verify(token,"rescue-app",(error,decoded)=>{
        if (decoded && decoded.email) {
            viewModel.find().then(
                (items)=>{
                    res.json(items)
                }
            ).catch(
                (error)=>{
                    res.json({"status":"error"})
                }
            )
        } else {
            res.json({"status":"Invalid Authentication"})
        }
    })
})

app.listen(5050, () => {
    console.log("server started")
})