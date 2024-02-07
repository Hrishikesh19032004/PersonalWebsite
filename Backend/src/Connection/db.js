const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/portfolioContact").then(()=>{
    console.log("Connection Successfull");
}).catch((err)=>{
    console.log(`Error connecting to database\n${err}`);
})