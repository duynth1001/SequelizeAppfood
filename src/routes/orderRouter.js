//Importing the Express framework
import express from 'express'
import { postOrder } from '../controller/orderController.js';

// Creating a router for handling add order-related routes
const orderAddRouter = express.Router();

// Route: GET /post-order
// Description: API endpoint to post a order for user
orderAddRouter.post("/post-order",postOrder)

export {orderAddRouter}
