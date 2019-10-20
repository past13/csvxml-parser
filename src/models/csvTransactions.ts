import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const CsvSchema = new Schema({
  transactionId: String,
  transactionDate: String, 
  currency: String,
  amount: String,
  status: String,
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

export const CsvTransactions = mongoose.model('CsvTransactions', CsvSchema);