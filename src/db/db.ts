import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://emrazanakoto:XUaWftobL6jeG0Qp@handletask.brxvyg7.mongodb.net/handleTaskBd?retryWrites=true&w=majority&appName=handleTask');
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;