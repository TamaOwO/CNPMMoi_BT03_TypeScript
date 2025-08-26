// src/routes/web.ts
import express, { Express } from 'express';
import homeController from '../controllers/homeControllers';

const router = express.Router();

const initWebRoutes = (app: Express): void => {
  // cách 1: route trả chuỗi
  router.get('/', (_req, res) => {
    return res.send('Huynh Thi My Tam');
  });

  // cách 2: gọi controller
  router.get('/home', homeController.getHomePage);
  router.get('/about', homeController.getAboutPage);
  router.get('/crud', homeController.getCRUD);
  router.post('/post-crud', homeController.postCRUD);
  router.get('/get-crud', homeController.getFindAllCrud);
  router.get('/edit-crud', homeController.getEditCRUD);
  // note: original used POST for update; keep same for simplicity
  router.post('/put-crud', homeController.putCRUD);
  router.get('/delete-crud', homeController.deleteCRUD);

  app.use('/', router);
};

export default initWebRoutes;