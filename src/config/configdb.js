import { Sequelize, Squelize } from 'sequelize';
//cosnt { Sequelize } = require('sequelize'); //ES5 module

//Option 3:Passing parameter separately (other dialects)
const sequelize = new Sequelize('node_fullstack', 'root', '1234567@a$', {
    host: 'localhost',
    dialect: 'mysql',   
    logging: fale
});
let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
module.exports = connectDB