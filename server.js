const  mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = require("./app");

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.msj15.mongodb.net/tour-management?retryWrites=true&w=majority`).then(()=> {
    console.log("yay, database is connected")
})


const port = process.env.PORT || 8000;


app.listen(port, ()=> {
    console.log(`server running on port ${port}`)
})