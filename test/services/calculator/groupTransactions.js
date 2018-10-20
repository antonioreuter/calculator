'use strict';


const chai = require('chai');
const chaiString = require('chai-string');

chai.use(chaiString);
const { assert } = chai;

const Transaction = require('../../../src/models/transaction');
const groupTransactions = require('../../../src/services/calculator/groupTransactions');

describe('groupTransactions', () => {
  it('When we have 8 transactions and we want to group by debtor->creditor', () => {
    const transactions = [];
    transactions.push(new Transaction({ debtor: 'Thijs', creditor: 'Den', amount: 10 }));
    transactions.push(new Transaction({ debtor: 'Thijs', creditor: 'Den', amount: 5 }));
    transactions.push(new Transaction({ debtor: 'Thijs', creditor: 'Den', amount: 13.5 }));
    transactions.push(new Transaction({ debtor: 'Thijs', creditor: 'Stefan', amount: 5 }));
    transactions.push(new Transaction({ debtor: 'Thijs', creditor: 'Stefan', amount: 15 }));
    transactions.push(new Transaction({ debtor: 'Den', creditor: 'Danny', amount: 8.5 }));
    transactions.push(new Transaction({ debtor: 'Den', creditor: 'Danny', amount: 2.6 }));
    transactions.push(new Transaction({ debtor: 'Stefan', creditor: 'Thijs', amount: 56.8 }));

    const groupedTransactions = groupTransactions(transactions);

    assert.equal(Object.keys(groupedTransactions).length, 3);
    assert.equal(groupedTransactions['Thijs']['Den'].amount, 28.5);
    assert.equal(groupedTransactions['Thijs']['Stefan'].amount, 20);
    assert.equal(groupedTransactions['Den']['Danny'].amount, 11.1);
    assert.equal(groupedTransactions['Stefan']['Thijs'].amount, 56.8);
  });
});
