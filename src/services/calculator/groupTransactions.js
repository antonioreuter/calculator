'use strict';

const reduceTransaction = (acc, transaction) => {
  const debtor = transaction.debtor;
  const creditor = transaction.creditor;

  if (!acc[debtor]) acc[debtor] = {};

  if (!acc[debtor][creditor]) {
    acc[debtor][creditor] = transaction;
  } else {
    acc[debtor][creditor].amount += transaction.amount;
  }

  return acc;
};

module.exports = transactions => transactions.reduce((acc, transaction) => reduceTransaction(acc, transaction), {});
