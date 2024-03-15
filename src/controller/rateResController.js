import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import { responseData } from "../config/respone.js";

// Initialize models for Sequelize ORM
const model = initModels(sequelize);

// Controller function for handling POST requests to rate a restaurant.
export const postRateRes = async (req, res) => {
  // Extract necessary data from request body
  const { userId, resId, amount, date_rate } = req.body;

  try {
    // Parse user-provided data to appropriate types
    const parseUserId = parseInt(userId); // Parse userId to integer
    const paraseResId = parseInt(resId); // Parse resId to integer
    const parseAmount = parseInt(amount); // Parse amount to integer
    // Format date_rate to match 'YYYY-MM-DD HH:mm:ss' format
    const formattedDate = new Date(date_rate)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    // Check if any required field is missing
    if (!parseUserId || !paraseResId || !parseAmount || !date_rate) {
      // Send 400 Bad Request response if any required field is missing
      return res
        .status(400)
        .json({ error: "Bad Request: Missing required fields" });
    }

    // Create a new rating using Sequelize's create method
    await model.rate_res.create({
      user_id: parseUserId, // Assign parsed userId
      res_id: paraseResId, // Assign parsed resId
      amount: parseAmount, // Assign parsed amount
      date_rate: formattedDate, // Assign formatted date_rate
    });

    // Send success response
    res.status(200).json({ message: "Resource rated successfully" });
  } catch (error) {
    // Handle any errors that occur during rating creation
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function for handling GET requests to get a rating list by res_id , user_id
export const getRateList = async (req, res) => {
  // Extract restaurant ID and user ID from request query parameters
  const resId = req.query.res_id;
  const userId = req.query.user_id;

  try {
    // Retrieve rate_res data for the specified user and restaurant
    let data = await model.rate_res.findAll({
      include: [
        // Include the user model and specify the attributes to be retrieved
        {
          model: model.user,
          attributes: ["user_id", "full_name", "email"],
          where: { user_id: userId }, // Filter based on user_id
          as: "user", // Alias for the user model
        },
        // Include the restaurant model and specify the attributes to be retrieved
        {
          model: model.restaurant,
          attributes: ["res_id", "res_name", "image", "desc"],
          where: { res_id: resId }, // Filter based on res_id
          as: "re", // Alias for the restaurant model
        },
      ],
    });

    // Check if any data is found
    if (data.length === 0) {
      // If no data found, send 404 Not Found
      responseData(res, "Data not found", 404, null);
    } else {
      // If data found, send 200 OK
      responseData(res, "Successfully fetched", 200, data);
    }
  } catch (error) {
    // Handle any errors that occur during rate_res retrieval
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
