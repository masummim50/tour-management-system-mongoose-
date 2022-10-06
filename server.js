const  mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = require("./app");

mongoose.connect(process.env.DATABASE_LOCAL).then(()=> {
    console.log("yay, database is connected")
})


const port = process.env.PORT || 8000;


app.listen(port, ()=> {
    console.log(`server running on port ${port}`)
})