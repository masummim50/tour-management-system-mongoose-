const Tour = require("../models/Tour");
const { getTourService, getTourByIdService, updateTourByIdService } = require("../services/tourService");

module.exports.getTours = async (req, res, next) => {
  try {
    // sending the whole request object to the service function
    let data =await getTourService(req);

    // checking if the data list is empty, if so, sending an extra message
    if(data.data.length == 0){
        data = {...data, message: "there is no data in this page"}
    }

    res.send(data);

  } catch (error) {
    res.send(error.message);
  }
};

module.exports.postTour = async(req, res, next)=> {
    try {
        
    const tour = await Tour.create(req.body);
        res.send({status: "success", data: tour});
    } catch (error) {
        res.send(error)
    }
}

module.exports.getTourById = async(req, res, next)=> {
    try {
        const data = await getTourByIdService(req.params.id);
        if(data.data){
            res.send(data)
        }else{
            res.send({message: "id is not valid"});
        }
    } catch (error) {
        res.send(error.message);
    }
}

module.exports.updateTourById = async(req, res, next)=> {
    try {
        const result = await updateTourByIdService(req.params.id, req.body);
        if(result.modifiedCount != 1){
            res.send({status: "failed", message: "validation failed"})
        }else{
        res.send({status: "success", message:"modified successfully"})}
    } catch (error) {
        res.send(error.message);
    }
}


module.exports.getTrendingTours = async(req, res, next)=> {
    const result = await Tour.find({}).sort("-view").limit(3);
    res.send(result)
}

module.exports.getCheapestTours = async(req, res,next)=> {
    const result = await Tour.find({}).sort("cost").limit(3);
    res.send(result);
}