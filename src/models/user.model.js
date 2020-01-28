import mongoose from 'mongoose';
import { preSave, comparePassword } from '../utils';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumbers: [String],
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country'
  }
});

schema.pre('save', preSave);
schema.methods.comparePassword = comparePassword;

export default mongoose.model('User', schema);
