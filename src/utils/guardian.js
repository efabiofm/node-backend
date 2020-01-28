import jwt from 'jwt-simple';
import moment from 'moment';

function isAuthorized(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).send('No authorization header');
  }
  validate(req, res);
  next();
}

function validate(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = decodeToken(token);
    if (payload.exp <= moment().unix()) {
      return res.status(401).send('Token expired');
    }
    return true;
  } catch (err) {
    return res.status(401).send(err.message);
  }
}

function decodeToken(tokenReq) {
  return jwt.decode(tokenReq, process.env.TOKEN_SECRET);
}

function createToken(userId) {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: moment().add(1, 'month').unix(),
  };
  return jwt.encode(payload, process.env.TOKEN_SECRET);
}

function addToken(userDB) {
  const userJSON = userDB.toJSON();
  userJSON.token = createToken(userDB._id);
  delete userJSON.password;
  return userJSON;
}

export default { isAuthorized, addToken };
