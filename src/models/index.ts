// src/models/index.ts
import sequelize from '../config/configdb';
import User from './user.model';

const db = {
  sequelize,
  User
};

export default db;
export { sequelize, User };