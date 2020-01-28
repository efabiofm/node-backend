import express from 'express';
import CountryModel from '../models/country.model';

const router = express.Router();

router.get('/', findHandler);
router.get('/:id', findByIdHandler);
router.post('/', createHandler);
router.put('/:id', updateByIdHandler);
router.delete('/:id', removeByIdHandler);

async function findHandler(req, res) {
  try {
    const docs = await CountryModel.find();
    return res.json(docs);
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function findByIdHandler(req, res) {
  try {
    const { id } = req.params;
    const doc = await CountryModel.findById(id);
    return res.json(doc);
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function createHandler(req, res) {
  try {
    const { body } = req;
    const doc = await CountryModel.create(body);
    return res.json(doc);
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function updateByIdHandler(req, res) {
  try {
    const { body } = req;
    const { id } = req.params;
    const doc = await CountryModel.findByIdAndUpdate(id, body);
    return res.json(doc);
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function removeByIdHandler(req, res) {
  try {
    const { id } = req.params;
    const doc = await CountryModel.findByIdAndRemove(id);
    return res.json(doc);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export default router;
