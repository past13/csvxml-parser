import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const XmlSchema = new Schema({
  transactionId: String,
  transactionDate: Date, 
  currency: String,
  amount: String,
  status: String,
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

export const XmlTransactions = mongoose.model('XmlTransactions', XmlSchema);