import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ProjectSchema = new Schema({
  transactionId: String,
  transactionDate: Date, 
  currencyCode: String,
  amount: String,
  status: String,
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

export const Projects = mongoose.model('Project', ProjectSchema);