'use strict';

const parser = require('./parser');
const billToTransactionConverter = require('./billToTransactionConverter');
const reduceBiDirectionalDebit = require('./reduceBiDirectionalDebit');
const reduceTransactions = require('./reduceTransactions');
const listTransactions = require('./listTransactions');

const convertBillsToTransactions = bills => bills
  .map(parser)
  .map(billToTransactionConverter)
  .reduce((prev, curr) => prev.concat(curr));

const processBills = (bills) => {
  if (!bills) return [];

  const transactions = convertBillsToTransactions(bills);
  const transactionsConsolidated = reduceBiDirectionalDebit(transactions);

  reduceTransactions(transactionsConsolidated);
  return listTransactions(transactionsConsolidated).filter(transaction => transaction.amount > 0);
}

module.exports = class Calculator {
  constructor(bills) {
    this.transactions = processBills(bills);
  }

  printTransactions() {
    this.transactions.forEach(t => console.log(`${t}`));
  }
};
