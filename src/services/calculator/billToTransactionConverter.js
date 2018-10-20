'use strict';

const Transaction = require('../../models/transaction');
const capitalizeStr = require('./util/capitalizeStr');

module.exports = (bill) => {
  const transactions = {};
  const quota = bill.amount / bill.attendees.length;

  bill.attendees.forEach((attendee) => {
    const transaction = transactions[attendee];
    if (transaction) {
      transaction.amount += quota;
    } else {
      const data = {};
      data.debtor = capitalizeStr(attendee);
      data.creditor = bill.paidBy;
      data.amount = quota;
      if (data.debtor !== data.creditor) {
        transactions[attendee] = new Transaction(data);
      }
    }
  });

  return Object.keys(transactions).map(t => transactions[t]);
};
