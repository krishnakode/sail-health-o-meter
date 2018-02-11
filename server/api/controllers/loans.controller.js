import Transaction from '../../models/transaction';

/**
 * Get all Loans
 * @param req
 * @param res
 * @returns void
 */
export function getLoans(req, res) {
  const loans = [];
  return Transaction.aggregate([
      { $group:
        {
          _id: '$loan_id',
          successful_repay: { $sum: { $cmp: ['REPAYMENT_DECLINED', '$type'] } },
          total_repay: { $sum: 1 },
        }
      },
      { $lookup:
        {
          from: 'loans',
          localField: '_id',
          foreignField: '_id',
          as: 'loan',
        }
      },
      { $project: 
        {
          name: { $arrayElemAt: ['$loan.name', 0] },
          health:
            { 
              $subtract: [
                { $multiply: [{ $divide: ['$successful_repay', '$total_repay'] }, 100] },
                { $mod: [{
                  $multiply: [{ $divide: ['$successful_repay', '$total_repay'] }, 100] }, 1]
                },
              ]
            },
        }
      },
      { $sort: { health: 1 } }])
   .cursor({ batchSize: 1000 })
   .exec()
   .on('data', loan => loans.push(loan))
   .on('end', () => res.send(loans));
}
