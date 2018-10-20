'use strict';

const reduceTransaction = (debits, transaction) => {
  const debtor = transaction.debtor;
  const creditor = transaction.creditor;

  const creditList = (debits[creditor]) ? Object.keys(debits[creditor]) : [];

  if (creditList && creditList.length > 0) {
    Object.keys(debits[debtor]).forEach((key) => {
      if (creditList.includes(key)) {
        if (debits[debtor][creditor].amount > debits[creditor][key].amount) {
          debits[debtor][creditor].amount -= debits[creditor][key].amount;
          debits[debtor][key].amount += debits[creditor][key].amount;
          debits[creditor][key].amount = 0;
        } else if (debits[debtor][creditor].amount < debits[creditor][key].amount) {
          debits[creditor][key].amount -= debits[debtor][creditor].amount;
          debits[debtor][key].amount += debits[debtor][creditor].amount;
          debits[debtor][creditor].amount = 0;
        }
      }
    });
  }
};

module.exports = (debits) => {
  Object.keys(debits).forEach((debtor) => {
    Object.keys(debits[debtor]).forEach((creditor) => {
      reduceTransaction(debits, debits[debtor][creditor]);
    });
  });

  return debits;
};
