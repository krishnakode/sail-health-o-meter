/**
 * Get all Loans
 * @param req
 * @param res
 * @returns void
 */
export function getLoans(req, res) {
  return res.send([
    {
      name: 'Sample loan',
      health: 88,
    },
    {
      name: 'Another Loan',
      health: 20,
    },
  ]);
}
