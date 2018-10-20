'use strict';

module.exports = class Transaction {
  constructor(data) {
    this.debtor = data.debtor;
    this.creditor = data.creditor;
    this.amount = data.amount;
  }

  toString() {
    return `${this.debtor} pays ${this.creditor} ${this.amount.toFixed(2)}`;
  }
};
