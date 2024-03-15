import { Sequelize } from "sequelize";
import config from "../config/config.js";


const sequelize = new Sequelize(
    config.database,
    config.user,
    config.pass,
    {
        host: config.database.host,
        port: config.port,
        dialect: config.dialect
    }
)
// dùng để test kết nối vào db
// try {
//     sequelize.authenticate()
//     console.log("OK")
// } catch (error) {
//     console.log(error)

// }
export default sequelize