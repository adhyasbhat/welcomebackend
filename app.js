const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require('body-parser')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const corsOptions = {origin:"http//localhost:5174"}
app.use(cors(corsOptions))

mongoose.connect("mongodb://localhost:27017/Welcome",{
}).then(()=>{
    console.log("Connected to server")
}).catch((error)=>{
    console.log("Error in connecting",error)
})

app.listen(PORT,()=>{
    console.log(`Server running on port: ${PORT}`)
})
