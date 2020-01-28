import bcrypt from 'bcrypt';
import util from 'util';

const SALT_WORK_FACTOR = 10;

function comparePassword(inputPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(inputPassword, this.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      return resolve(isMatch);
    });
  });
}

function encryptModel(model, next) {
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      return next(err);
    }
    return bcrypt.hash(model.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      model.password = hash;
      return next();
    });
  });
}

async function encryptPassword(password) {
  const salt = await util.promisify(bcrypt.genSalt)(SALT_WORK_FACTOR);
  const hash = await util.promisify(bcrypt.hash)(password, salt);
  return hash;
}


function preSave(next) {
  const model = this;
  if (!model.isModified('password')) {
    return next();
  }
  return encryptModel(model, next);
}

export default {
  preSave,
  comparePassword,
  encryptPassword
};
