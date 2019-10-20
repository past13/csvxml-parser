import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const CsvWrongSchema = new Schema({
  transactionId: String,
  transactionDate: String, 
  currency: String,
  amount: String,
  status: String,
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

export const CsvWrongTransactions = mongoose.model('CsvWrongTransactions', CsvWrongSchema);