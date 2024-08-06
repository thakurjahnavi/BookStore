const express = require("express");
const app = express();
require("dotenv").config();
require("./connetion/conn");
app.get("/",(req,res)=>{
    res.send({message:"hello from server"});
})
app.listen(process.env.PORT , ()=>{
    console.log(`Server is listening on ${process.env.PORT}`)
})

