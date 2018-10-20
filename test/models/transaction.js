'use strict';

const Transaction = require('../../src/models/transaction');

const chai = require('chai');
const chaiString = require('chai-string');

chai.use(chaiString);
const { assert } = chai;

describe('Transaction', () => {
  describe('#toString', () => {
    it('When we try to print a transactions', () => {
      const data = {
        debtor: 'Thijs',
        creditor: 'Danny',
        amount: 50.00
      };
      const transaction = new Transaction(data);

      assert.equalIgnoreCase(transaction.toString(), `${data.debtor} pays ${data.creditor} ${data.amount.toFixed(2)}`);
    })
  });
});
