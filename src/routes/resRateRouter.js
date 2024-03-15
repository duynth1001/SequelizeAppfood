// Importing the Express framework
import express from "express";

// Creating a router for handling restaurant rating-related routes
const resRateRouter = express.Router();

// Importing the function to handle the POST request for rating a restaurant
import { getRateList, postRateRes } from "../controller/rateResController.js";
// Route: POST /post-rate-res
// Description: API endpoint to post a rating for a restaurant by user_id, res_id, amount, and date_rate
resRateRouter.post("/post-rate-res", postRateRes);

// Route: GET /get-rate-list
// Description: API endpoint to get a rating list by res_id , user_id

const resGetRateListRouter = express.Router();
resGetRateListRouter.get("/get-rate-list", getRateList);

// Exporting the resRateRouter to make it accessible to other parts of the application
export { resRateRouter, resGetRateListRouter };
