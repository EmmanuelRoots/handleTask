import mongoose from 'mongoose';

interface IMessage extends mongoose.Document {
    content: string;
    sender: mongoose.Types.ObjectId;
    recipient: mongoose.Types.ObjectId;
  }
  
export const Message = mongoose.model<IMessage>('Message', new mongoose.Schema({
content: { type: String, required: true },
sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}));