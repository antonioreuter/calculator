'use strict';

const groupTransactions = require('./groupTransactions');

const reduceDebits = (debits) => {
  Object.keys(debits).forEach((debtor) => {
    Object.keys(debits[debtor]).forEach((creditor) => {
      if (debits[creditor][debtor]) {
        if (debits[debtor][creditor].amount === debits[creditor][debtor].amount) {
          delete debits[debtor][creditor];
          delete debits[creditor][debtor];
        } else if (debits[debtor][creditor].amount > debits[creditor][debtor].amount) {
          debits[debtor][creditor].amount -= debits[creditor][debtor].amount;
          delete debits[creditor][debtor];
        } else {
          debits[creditor][debtor].amount -= debits[debtor][creditor].amount;
          delete debits[debtor][creditor];
        }
      }
    });
  });

  return debits;
};

module.exports = (transactions) => {
  const groupedByDebtorCreditor = groupTransactions(transactions);

  return reduceDebits(groupedByDebtorCreditor);
}
