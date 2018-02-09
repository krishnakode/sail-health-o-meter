import Loan from './models/loan';
import Transaction from './models/transaction';

const firstName = [
  'Pauls',
  'Beeshals',
  'Luizs',
  'Nicks',
  'Annas',
  'Yanirs',
  'Schmuckys',
];
const adjective = [
  'Awesome',
  'Pitiful',
  'Great',
  'Cool',
  'Beautiful',
  'Above Average',
];
const type = [
  'Pizzeria',
  'Pub',
  'Bakery',
  'Cafe',
];

function getRandomWeeks() {
  return Math.floor(Math.random() * 40) + 13;
}

async function populateData() {
  // loop tings
  for (let count = 0; count < 1000; count++) {
    // take first thing off queue
    const first = firstName.shift();
    const second = adjective.shift();
    const third = type.shift();

    const loan = await Loan.create({
      name: `${first} ${second} ${third}`,
    });

    // Put back on queue
    firstName.push(first);
    adjective.push(second);
    type.push(third);

    let transactionCount = getRandomWeeks();
    const today = new Date();
    let seq = 0;
    while (transactionCount !== 0) {
      let transactionDate = new Date(today.setTime(today.getTime() + (7 * seq) * 86400000));
      if (count < 333) {
        await Transaction.create({
          loan_id: loan._id,
          seq_id: seq,
          created_at: transactionDate,
          type: 'REPAYMENT',
        });
      } else if ((count < 666 && seq < transactionCount / 2) || (count >= 666 && seq >= transactionCount / 2)) {
        await Transaction.create({
          loan_id: loan._id,
          seq_id: seq,
          created_at: transactionDate,
          type: 'REPAYMENT',
        });
      } else if ((count < 666 && seq > transactionCount / 2) || (count >= 666 && seq <= transactionCount / 2)) {
        await Transaction.create({
          loan_id: loan._id,
          seq_id: seq,
          created_at: transactionDate,
          type: 'REPAYMENT_REVERSED',
        });
      }
      seq++;
      transactionCount--;
    }
  }
}


export default async function () {
  try {
    const count = await Loan.count().exec();
    if (count > 0) {
      return;
    }

    await populateData();
  } catch (err) {
    console.log(err);
  }
}
