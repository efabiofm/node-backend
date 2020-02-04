import express from 'express';
import UserModel from '../models/user.model';

const router = express.Router();

router.get('/', findHandler);
router.get('/:id', findByIdHandler);
router.post('/', createHandler);
router.put('/:id', updateByIdHandler);
router.delete('/:id', removeByIdHandler);

async function findHandler(req, res) {
  try {
    const docs = await UserModel.find({}, { password: false });
    return res.json(docs);
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function findByIdHandler(req, res) {
  try {
    const { id } = req.params;
    const doc = await UserModel.findById(id, { password: false }).populate('country');
    return res.json(doc);
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function createHandler(req, res) {
  try {
    const { body } = req;
    const doc = await UserModel.create(body, { password: false });
    return res.json(doc);
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function updateByIdHandler(req, res) {
  try {
    const { body } = req;
    const { id } = req.params;
    const doc = await UserModel.findByIdAndUpdate(id, body, {
      new: true,
      fields: { password: false }
    });
    return res.json(doc);
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function removeByIdHandler(req, res) {
  try {
    const { id } = req.params;
    const doc = await UserModel.findByIdAndRemove(id, { password: false });
    return res.json(doc);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export default router;
