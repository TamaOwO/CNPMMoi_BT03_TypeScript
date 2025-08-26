import { Sequelize  } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
//cosnt { Sequelize } = require('sequelize'); //ES5 module


//Option 3:Passing parameter separately (other dialects)
export const sequelize = new Sequelize('node_fullstack', 'root', '1234567@a$', {
    host: 'localhost',
    dialect: 'mysql',   
    logging: false,
    
});
export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
export default connectDB;