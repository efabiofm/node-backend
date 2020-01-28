import express from 'express';
import UserModel from '../models/user.model';
import { addToken } from '../utils';

const router = express.Router();

router.post('/signin', signinHandler);
router.post('/signup', signupHandler);

async function signinHandler(req, res) {
  const { email, password } = req.body;
  const userDB = await UserModel.findOne({ email });
  if (userDB) {
    const isMatch = await userDB.comparePassword(password);
    if (isMatch) {
      const userWithToken = addToken(userDB);
      return res.json(userWithToken);
    }
  }
  return res.status(401).send('Invalid user or password');
}

async function signupHandler(req, res) {
  try {    
    const { body } = req;
    const userDB = await UserModel.create(body);
    const userWithToken = addToken(userDB);
    return res.json(userWithToken);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export default router;
