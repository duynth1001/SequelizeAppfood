import { DataTypes } from "sequelize";
import _food from "./food.js";
import _food_type from "./food_type.js";
import _like_res from "./like_res.js";
import _order from "./order.js";
import _rate_res from "./rate_res.js";
import _restaurant from "./restaurant.js";
import _sub_food from "./sub_food.js";
import _user from "./user.js";

export default function initModels(sequelize) {
  // Define Sequelize models and their associations

  // Define the "food" model
  var food = _food(sequelize, DataTypes);

  // Define the "food_type" model
  var food_type = _food_type(sequelize, DataTypes);

  // Define the "like_res" model, which represents the likes relationship between users and restaurants
  var like_res = _like_res(sequelize, DataTypes);

  // Define the "order" model, which represents orders made by users for specific foods
  var order = _order(sequelize, DataTypes);

  // Define the "rate_res" model, which represents the ratings given by users to restaurants
  var rate_res = _rate_res(sequelize, DataTypes);

  // Define the "restaurant" model
  var restaurant = _restaurant(sequelize, DataTypes);

  // Define the "sub_food" model, which represents subtypes or variations of foods
  var sub_food = _sub_food(sequelize, DataTypes);

  // Define the "user" model, which represents users interacting with the system
  var user = _user(sequelize, DataTypes);

  // Relationships sorted by order of definition

  // user - food relationship
  user.belongsToMany(food, {
    as: "food_id_foods",
    through: order,
    foreignKey: "user_id",
    otherKey: "food_id",
  });

  // food - user relationship
  food.belongsToMany(user, {
    as: "user_id_user_orders",
    through: order,
    foreignKey: "food_id",
    otherKey: "user_id",
  });

  // user - restaurant relationship
  user.belongsToMany(restaurant, {
    as: "res_id_restaurants",
    through: like_res,
    foreignKey: "user_id",
    otherKey: "res_id",
  });
  user.belongsToMany(restaurant, {
    as: "res_id_restaurant_rate_res",
    through: rate_res,
    foreignKey: "user_id",
    otherKey: "res_id",
  });

  // restaurant - user relationship
  restaurant.belongsToMany(user, {
    as: "user_id_users",
    through: like_res,
    foreignKey: "res_id",
    otherKey: "user_id",
  });
  restaurant.belongsToMany(user, {
    as: "user_id_user_rate_res",
    through: rate_res,
    foreignKey: "res_id",
    otherKey: "user_id",
  });

  // food - order relationship
  order.belongsTo(food, { as: "food", foreignKey: "food_id" });
  food.hasMany(order, { as: "orders", foreignKey: "food_id" });

  // food - sub_food relationship
  sub_food.belongsTo(food, { as: "food", foreignKey: "food_id" });
  food.hasMany(sub_food, { as: "sub_foods", foreignKey: "food_id" });

  // food - food_type relationship
  food.belongsTo(food_type, { as: "type", foreignKey: "type_id" });
  food_type.hasMany(food, { as: "foods", foreignKey: "type_id" });

  // like_res - restaurant relationship
  like_res.belongsTo(restaurant, { as: "re", foreignKey: "res_id" });
  restaurant.hasMany(like_res, { as: "like_res", foreignKey: "res_id" });

  // rate_res - restaurant relationship
  rate_res.belongsTo(restaurant, { as: "re", foreignKey: "res_id" });
  restaurant.hasMany(rate_res, { as: "rate_res", foreignKey: "res_id" });

  // like_res - user relationship
  like_res.belongsTo(user, { as: "user", foreignKey: "user_id" });
  user.hasMany(like_res, { as: "like_res", foreignKey: "user_id" });

  // order - user relationship
  order.belongsTo(user, { as: "user", foreignKey: "user_id" });
  user.hasMany(order, { as: "orders", foreignKey: "user_id" });

  // rate_res - user relationship
  rate_res.belongsTo(user, { as: "user", foreignKey: "user_id" });
  user.hasMany(rate_res, { as: "rate_res", foreignKey: "user_id" });

  return {
    food,
    food_type,
    like_res,
    order,
    rate_res,
    restaurant,
    sub_food,
    user,
  };
}
