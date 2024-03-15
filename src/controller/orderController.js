import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

// Initialize models for Sequelize ORM
const model = initModels(sequelize);

// Controller function for handling POST requests to add a order.
export const postOrder = async (req, res) => {
  // Extract necessary data from request body
  const { userId, foodId, amount, code, arr_sub_id } = req.body;
  try {
    // Parse user-provided data to appropriate types
    const parseUserId = parseInt(userId); // Parse userId to integer
    const parseFoodId = parseInt(foodId); //Parse foodId to integer
    const parseAmount = parseInt(amount); //Parse amount to integer
    // Check if any required field is missing
    if (!parseUserId || !parseFoodId || !parseAmount || !code || !arr_sub_id) {
      // Send 400 Bad Request response if any required field is missing
      return res
        .status(400)
        .json({ error: "Bad Request: Missing required fields" });
    }
    // Create a new order using Sequelize's create method
    await model.order.create({
      user_id: parseUserId, // Assign parsed userId
      food_id: parseFoodId, // Assign parsed foodId
      amount: parseAmount, // Assign parsed amount
      code: code, // Assign code
      arr_sub_id: arr_sub_id, //Assign arr_sub_id
    });
    // Send success response
    res.status(200).json({ message: "Resource rated successfully" });
  } catch (error) {
    // Handle any errors that occur during ordering creation
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
