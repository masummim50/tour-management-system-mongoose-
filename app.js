const express = require("express")
const app = express();
const cors = require("cors");
const router = require("./routes/tourRoutes");
const fs = require("fs");
const Tour = require("./models/Tour");


app.use(cors())
app.use(express.json())

app.get("/", (req, res)=> {
    res.sendFile(__dirname + "/view/index.html")
    
})




app.use("/api/v1/tours", router)


module.exports = app;
