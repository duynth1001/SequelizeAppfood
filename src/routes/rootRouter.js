// Importing the Express framework
import express from 'express';

// Importing the router for handling like-related routes
import likeRouter from './likeRouter.js';
// Importing the router for handling rate_res-related routes
import {resGetRateListRouter, resRateRouter} from './resRateRouter.js';
import { orderAddRouter } from './orderRouter.js';

// Creating a root router using Express Router
const rootRouter = express.Router();

// Mounting the likeRouter under the '/like' route
rootRouter.use('/like', likeRouter);

// Mounting the resRateRouter under the '/rate-res' route
rootRouter.use('/rate-res', resRateRouter);

// Mounting the getRateList under the '/rate-res' route
rootRouter.use('/rate-res', resGetRateListRouter);

// Mounting the orderAddRouter under the '/order' route
rootRouter.use('/order',orderAddRouter)
// Exporting the rootRouter to make it accessible to other parts of the application
export default rootRouter;
