
const mongoose = require("mongoose");

const tourSchema = mongoose.Schema({
    name: {
        type:String,
        required: true
    }, 
    destination: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true,
        min: [50, "must be higher than 50"]
    },
    view: {
        type: Number,
        default: 0
    },
    spaceLeft: {
        type: Number,
        required: true
    }
}, {timestamps: true});

// model base on schema
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;