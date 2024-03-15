// Importing the Express framework
import express from 'express';

// Importing controller functions for handling like-related operations
import { getLikeByResID, getLikeByUserID } from '../controller/likeController.js';

// Creating a router for handling like-related routes
const likeRouter = express.Router();

// Route: GET /get-like-by-user/:userId
// Description: API endpoint to get likes by user ID
likeRouter.get('/get-like-by-user/:userId', getLikeByUserID);

// Route: GET /get-like-by-res/:resId
// Description: API endpoint to get likes by restaurant ID
likeRouter.get('/get-like-by-res/:resId', getLikeByResID);

// Exporting the likeRouter to make it accessible to other parts of the application
export default likeRouter;
