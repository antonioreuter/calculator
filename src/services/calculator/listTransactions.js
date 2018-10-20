'use strict';

const sortTransaction = (el1, el2) => {
  let debtor1 = el1.debtor.toUpperCase();
  let debtor2 = el2.debtor.toUpperCase();
  if (debtor1 < debtor2) return -1;
  if (debtor1 > debtor2) return 1;
  return 0;
};

const explodeTransactions = (acc, debits) => {
  const result = Object.keys(debits).map(el => debits[el]);
  result.forEach(el => acc.push(el));
  return acc;
};

module.exports = transactions => Object.keys(transactions)
.map(el => transactions[el])
.reduce((acc, debits) => explodeTransactions(acc, debits), [])
.filter(el => el.debtor !== el.creditor)
.sort(sortTransaction);
