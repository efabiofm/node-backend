import mongoose from 'mongoose';

export default () => {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.connection.on('error', err => console.error(err));
};
