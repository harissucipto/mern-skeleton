import User from '../models/user.model';
import Barang from '../models/barang.model';
import _ from 'lodash';
import errorHandler from './../helpers/dbErrorHandler';

const create = (req, res) => {
  const barang = new Barang(req.body);
  barang.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    res.status(200).json({
      barang
    });
  });
};

/**
 * Load user and append to req.
 */
const userByID = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user)
      return res.status('400').json({
        error: 'User not found'
      });
    req.profile = user;
    next();
  });
};

const barangByID = (req, res, next, id) => {
  Barang.findById(id).exec((err, barang) => {
    if (err || !barang)
      return res.status('400').json({
        error: 'Barang not found'
      });
    req.barang = barang;
    next();
  });
};

const read = (req, res) => {
  return res.json(req.barang);
};

const list = (req, res) => {
  const idUser = req.profile._id;
  Barang.find({ idUser }, (err, items) => {
    return res.json({ items });
  });
};

const update = (req, res, next) => {
  let barang = req.barang;
  barang = _.extend(barang, req.body);

  barang.save(err => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    res.json(barang);
  });
};

const remove = (req, res, next) => {
  let barang = req.barang;
  barang.remove((err, deletedBarang) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }

    res.json(deletedBarang);
  });
};

export default {
  create,
  userByID,
  barangByID,
  read,
  list,
  remove,
  update
};
