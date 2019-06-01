/*
  tambah post
  edit put
  delete delete
  read get
*/

import express from 'express';

import userCtrl from '../controllers/user.controller';
import authCtrl from '../controllers/auth.controller';
import barangCtrl from '../controllers/barang.controller';

const router = express.Router();

router
  .route('/api/barangs/:userId')
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, barangCtrl.list);

router
  .route('/api/barang/:userId')
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, barangCtrl.create);

router
  .route('/api/barang/:userId&:barangId')
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, barangCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, barangCtrl.remove);

router.param('userId', barangCtrl.userByID);
router.param('barangId', barangCtrl.barangByID);

export default router;
