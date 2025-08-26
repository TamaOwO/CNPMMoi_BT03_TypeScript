// src/services/crudService.ts
import bcrypt from 'bcryptjs';
// import User model: tùy cách bạn export trong src/models/index.ts
// 1) nếu bạn export { User } từ src/models/index.ts:
import { User } from '../models';
// 2) nếu bạn chỉ có default export model file: import User from '../models/user.model';

export interface CreateUserDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address?: string | null;
  phoneNumber?: string | null;
  gender?: string | boolean | number | null; // frontend có thể gửi '1'/'0'
  image?: string | null;
  roleId?: string | null;
  positionId?: string | null;
}

export interface UpdateUserDTO {
  id: number;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  address?: string | null;
  phoneNumber?: string | null;
  gender?: string | boolean | number | null;
  image?: string | null;
  roleId?: string | null;
  positionId?: string | null;
}

const SALT_ROUNDS = 10;

/** 1 việc: convert các giá trị khác nhau thành boolean|null cho gender */
const normalizeGender = (g?: string | boolean | number | null): boolean | null => {
  if (g === undefined || g === null) return null;
  if (typeof g === 'boolean') return g;
  if (typeof g === 'number') return g === 1;
  const s = String(g).toLowerCase().trim();
  if (s === '1' || s === 'true' || s === 'male') return true;
  if (s === '0' || s === 'false' || s === 'female') return false;
  return null;
};

/** 1 việc: hash password */
export const hashUserPassword = async (password: string): Promise<string> => {
  // bcryptjs: use sync for simple small apps; we wrap in async for consistent API
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  return bcrypt.hashSync(password, salt);
};

/** 1. tạo user mới (throws error nếu có vấn đề) */
export const createNewUser = async (data: CreateUserDTO): Promise<string> => {
  // kiểm tra email đã tồn tại
  const exists = await User.findOne({ where: { email: data.email } });
  if (exists) throw new Error('Email already exists');

  const hashed = await hashUserPassword(data.password);

  await User.create({
    email: data.email,
    password: hashed,
    firstName: data.firstName,
    lastName: data.lastName,
    address: data.address ?? null,
    phoneNumber: data.phoneNumber ?? null,
    gender: normalizeGender(data.gender),
    image: data.image ?? null,
    roleId: data.roleId ?? null,
    positionId: data.positionId ?? null
  });

  return 'OK create a new user successful';
};

/** 2. lấy tất cả user (loại bỏ password) */
export const getAllUsers = async (): Promise<any[]> => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
    raw: true
  });
  return users;
};

/** 3. lấy user theo id (loại bỏ password) */
export const getUserInfoById = async (userId: number): Promise<any | null> => {
  const user = await User.findOne({
    where: { id: userId },
    attributes: { exclude: ['password'] },
    raw: true
  });
  return user ?? null;
};

/** 4. cập nhật user (nếu có password -> hash) -> trả về user đã cập nhật (không có password) */
export const updateUser = async (payload: UpdateUserDTO): Promise<any> => {
  const user = await User.findByPk(payload.id);
  if (!user) throw new Error('User not found');

  if (payload.firstName !== undefined) user.firstName = payload.firstName;
  if (payload.lastName !== undefined) user.lastName = payload.lastName;
  if (payload.address !== undefined) user.address = payload.address;
  if (payload.phoneNumber !== undefined) user.phoneNumber = payload.phoneNumber;
  if (payload.roleId !== undefined) user.roleId = payload.roleId;
  if (payload.positionId !== undefined) user.positionId = payload.positionId;
  if (payload.image !== undefined) user.image = payload.image;
  if (payload.email !== undefined) user.email = payload.email;
  if (payload.gender !== undefined) user.gender = normalizeGender(payload.gender);

  if (payload.password) {
    user.password = await hashUserPassword(payload.password);
  }

  await user.save();

  // trả về bản ghi đã cập nhật (không có password)
  const updated = await User.findByPk(user.id, { attributes: { exclude: ['password'] }, raw: true });
  return updated;
};

/** 5. xóa user theo id */
export const deleteUserById = async (userId: number): Promise<boolean> => {
  const user = await User.findByPk(userId);
  if (!user) return false;
  await user.destroy();
  return true;
};

export default {
  hashUserPassword,
  createNewUser,
  getAllUsers,
  getUserInfoById,
  updateUser,
  deleteUserById
};