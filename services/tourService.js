const Tour = require("../models/Tour");


module.exports.getTourService = async(req)=>{
    const copy = { ...req.query };
    let filter = { ...req.query };
    const exclude = ["sort", "page", "limit", "fields", "skip"];
    exclude.forEach((item) => {
      delete filter[item];
    });
    const queries = {};
    if (copy.sort) queries.sortby = copy.sort.split(",").join(" ");
    if (copy.limit){
        queries.limit = copy.limit;
    }else{
        queries.limit = 5;
    }

    if (copy.page) {
        let skip = (copy.page-1)*queries.limit;
      queries.page = copy.page;
      queries.skip = skip;
    } else {
      queries.page = 1;
    }

    if (copy.fields) queries.fields = copy.fields.split(",").join(" ");

    let filterstring = JSON.stringify(filter);

    filterstring = filterstring.replace(
      /\b(gt|lt|gte|lte)\b/g,
      (match) => `$${match}`
    );
    filter = await JSON.parse(filterstring);

    const result = await Tour.find(filter).select(queries.fields).limit(queries.limit).skip(queries.skip).sort(queries.sortby);
    let pagecount = await Tour.find(filter).countDocuments();
    pagecount = pagecount/queries.limit;
    pagecount = Math.ceil(pagecount);
    const data = {
        page: queries.page,
        pagecount,
        data: result
    };
    return data;
};


module.exports.getTourByIdService = async(id)=> {
    try {
        const data = await Tour.findById(id);
        const update = await Tour.updateOne({_id: id}, {$inc: {view:1}})
        return {data};
    } catch (error) {
        return error;
    }
    
}

module.exports.updateTourByIdService = async(id, data)=> {
    try {
        const res = await Tour.updateOne({_id: id}, data, {runValidators: true});
        return res;
    } catch (error) {
        return error;
    }
}