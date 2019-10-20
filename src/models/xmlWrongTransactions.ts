import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const XmlWrongSchema = new Schema({
  transactionId: String,
  transactionDate: Date, 
  currency: String,
  amount: String,
  status: String,
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

export const XmlWrongTransactions = mongoose.model('XmlWrongTransactions', XmlWrongSchema);