import encrypter from './encrypter';
import guardian from './guardian';

const { preSave, comparePassword, encryptPassword } = encrypter;
const { isAuthorized, addToken } = guardian;

function skipLimitABS(query) {
  const limit = parseInt(query.limit || 0, 10);
  const skip = parseInt(query.page || 0, 10) * limit;
  return {
    limit,
    skip,
  };
}

export {
  comparePassword,
  addToken,
  encryptPassword,
  isAuthorized,
  preSave,
  skipLimitABS
};
