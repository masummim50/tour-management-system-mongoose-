
const express = require("express");
const { getTours, getTourById, updateTourById, getTrendingTours, getCheapestTours, postTour } = require("../controllers/tourController");

const router = express.Router();

router.route("/").get(getTours).post(postTour);

router.route("/trending").get(getTrendingTours);
router.route("/cheapest").get(getCheapestTours);

router.route("/:id").get(getTourById).patch(updateTourById)

module.exports = router;