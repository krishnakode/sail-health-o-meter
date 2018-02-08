import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const loanSchema = new Schema({
  name: { type: 'String', required: true },
});

export default mongoose.model('Loan', loanSchema);
