import { responseData } from "../config/respone.js"
import sequelize from "../models/connect.js"
import initModels from "../models/init-models.js"

// Initialize models for Sequelize ORM
const model = initModels(sequelize)

// Controller: API endpoint to retrieve like data for a specific user ID
const getLikeByUserID = async (req, res) => {
    // Get user id
    const { userId } = req.params;

    try {
         // Retrieve like data for the specified user
        let data = await model.like_res.findAll({
            include: [
                { 
                    model: model.user, // Specify the model to include
                    as: "user" // Specify the alias
                }
            ],
            where: {
                user_id: userId // Filter based on the user's ID
            }
        });

        if (data.length === 0) {
            // If no data found, send 404 Not Found
            responseData(res, 'Data not found', 404, null);
        } else {
            // If data found, send 200 OK
            responseData(res, 'Successfully fetched', 200, data);
        }
    } catch (error) {
        // If any unexpected error occurs, send 500 Internal Server Error
        responseData(res, 'Internal Server Error', 500, null);
    }
}

// Controller: API endpoint to retrieve like data for a specific restaurant ID
const getLikeByResID = async(req,res)=>{
    //Get restaurant id
    const {resId}= req.params
    //Retrive like data for the specified restaurant
    try {
        let data=await model.like_res.findAll({
            include:[
                {
                    model:model.restaurant,// Specify the model to include
                    as:"re" // Specify the alias
                }
            ],
            where:{
                res_id:resId // Filter based on the restaurant's ID
            }
        });
        if (data.length === 0) {
            // If no data found, send 404 Not Found
            responseData(res, 'Data not found', 404, null);
        } else {
            // If data found, send 200 OK
            responseData(res, 'Successfully fetched', 200, data);
        }
    } catch (error) {
        // If any unexpected error occurs, send 500 Internal Server Error
        responseData(res, 'Internal Server Error', 500, null);
    }
    
}

export {getLikeByUserID,getLikeByResID}