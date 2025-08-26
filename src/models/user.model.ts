// src/models/user.model.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/configdb'; // đảm bảo file configdb.ts export { sequelize }

export interface UserAttributes {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address?: string | null;
  phoneNumber?: string | null;
  gender?: boolean | null;
  image?: string | null;
  roleId?: string | null;
  positionId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// Các trường bắt buộc khi tạo mới (id sẽ được auto)
export interface UserCreationAttributes extends Optional<
  UserAttributes,
  'id' | 'address' | 'phoneNumber' | 'gender' | 'image' | 'roleId' | 'positionId' | 'createdAt' | 'updatedAt'
> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public address?: string | null;
  public phoneNumber?: string | null;
  public gender?: boolean | null;
  public image?: string | null;
  public roleId?: string | null;
  public positionId?: string | null;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // nếu cần define association, đặt ở đây
  static associate(models: any) {
    // ví dụ: User.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role' });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    gender: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    roleId: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    positionId: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true
  }
);

export default User;