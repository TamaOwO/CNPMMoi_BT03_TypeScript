// src/controllers/homeController.ts
import { Request, Response, NextFunction } from 'express';
import CRUDService from '../services/CRUDServices'; // đảm bảo đường dẫn đúng

// Hiển thị homepage (render view 'homepage')
const getHomePage = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await CRUDService.getAllUsers();
    // truyền users (object/array) trực tiếp tới view, tránh JSON.stringify ở controller
    return res.render('homepage', { users });
  } catch (error) {
    return next(error);
  }
};

// Hiển thị trang about
const getAboutPage = (_req: Request, res: Response) => {
  return res.render('test/about'); // view: src/views/test/about.ejs
};

// Hiển thị form tạo mới (view 'crud')
const getCRUD = (_req: Request, res: Response) => {
  return res.render('crud'); // view: src/views/crud.ejs
};

// Xử lý POST tạo mới user
const postCRUD = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // map form data -> DTO service
    const {
      email,
      password,
      firstName,
      lastName,
      address,
      phoneNumber,
      gender,
      image,
      roleId,
      positionId,
    } = req.body;

    await CRUDService.createNewUser({
      email,
      password,
      firstName,
      lastName,
      address,
      phoneNumber,
      gender,
      image,
      roleId,
      positionId,
    });

    // sau khi tạo, chuyển hướng về danh sách
    return res.redirect('/get-crud');
  } catch (error) {
    return next(error);
  }
};

// Hiển thị tất cả users (view users/findAllUser)
const getFindAllCrud = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await CRUDService.getAllUsers();
    return res.render('users/findAllUser', { datalist: data });
  } catch (error) {
    return next(error);
  }
};

// Lấy dữ liệu user để show form edit
const getEditCRUD = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userIdRaw = req.query.id;
    const userId = Number(userIdRaw);

    if (!userId || Number.isNaN(userId)) {
      return res.status(400).send('Invalid or missing id');
    }

    const userData = await CRUDService.getUserInfoById(userId);
    if (!userData) return res.status(404).send('User not found');

    return res.render('users/updateUser', { data: userData });
  } catch (error) {
    return next(error);
  }
};

// Xử lý cập nhật (PUT emulated bằng POST ở route hiện tại)
const putCRUD = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    // đảm bảo id là number
    payload.id = Number(payload.id);

    if (!payload.id || Number.isNaN(payload.id)) {
      return res.status(400).send('Invalid or missing id');
    }

    await CRUDService.updateUser(payload);

    // lấy lại danh sách để render
    const allUsers = await CRUDService.getAllUsers();
    return res.render('users/findAllUser', { datalist: allUsers });
  } catch (error) {
    return next(error);
  }
};

// Xử lý xóa user theo query param ?id=...
const deleteCRUD = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const idRaw = req.query.id;
    const id = Number(idRaw);

    if (!id || Number.isNaN(id)) {
      return res.status(400).send('Invalid or missing id');
    }

    await CRUDService.deleteUserById(id);
    // redirect về danh sách sau khi xóa
    return res.redirect('/get-crud');
  } catch (error) {
    return next(error);
  }
};

export default {
  getHomePage,
  getAboutPage,
  getCRUD,
  postCRUD,
  getFindAllCrud,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
};