const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const User = require("./js/user")

const app = express()
const PORT = 4000

// middleware

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors({
    origin: '*'
}));

mongoose.connect("mongodb+srv://Neha:neha@cluster0.crpwg8u.mongodb.net/", {useNewUrlParser: true, useUnifiedTopology: true})

app.get("/",async (_req, res) => {
    const data = await User.find()
    res.status(200).json(data)
})

app.post("/add/user", (req,res) => {
    const fname = req.body.fname
    const lname = req.body.lname
    const country = req.body.country
    const text = req.body.text

    const user = new User({
        fname,
        lname,
        country,
        text
    })   

    user.save().then(obj => {
        console.log(obj)
        res.status("200").send("The Data Was Added")
    }).catch(err => {
        console.log(err)
    })
})

app.listen(PORT, () => {
    console.log(`the server is running at port ${PORT}`);
})
 