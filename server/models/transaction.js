import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  loan_id: { type: 'ObjectId', ref: 'Loan', required: true },
  created_at: { type: 'Date', required: true },
  type: { type: 'String', enum: ['REPAYMENT', 'REPAYMENT_DECLINED'], required: true },
  seq_id: { type: 'Number', required: true },
});

export default mongoose.model('Transaction', transactionSchema);
