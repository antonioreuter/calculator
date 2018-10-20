'use strict';


const chai = require('chai');
const chaiString = require('chai-string');

chai.use(chaiString);
const { assert } = chai;

const Transaction = require('../../../src/models/transaction');
const groupTransactions = require('../../../src/services/calculator/groupTransactions');
const reduceTransactions = require('../../../src/services/calculator/reduceTransactions');

describe('reduceTransactions', () => {
  it('When we try to reduce the number of transactions', () => {
    const transactions = [];
    transactions.push(new Transaction({ debtor: 'Stefan', creditor: 'Thijs', amount: 10 }));
    transactions.push(new Transaction({ debtor: 'Stefan', creditor: 'Danny', amount: 20.25 }));
    transactions.push(new Transaction({ debtor: 'Stefan', creditor: 'Den', amount: 8.6 }));

    transactions.push(new Transaction({ debtor: 'Den', creditor: 'Thijs', amount: 40.8 }));
    transactions.push(new Transaction({ debtor: 'Den', creditor: 'Danny', amount: 19.65 }));

    transactions.push(new Transaction({ debtor: 'Thijs', creditor: 'Danny', amount: 9.45 }));

    const groupedByDebtorCreditor = groupTransactions(transactions);
    const reducedTransactions = reduceTransactions(groupedByDebtorCreditor);

    assert.equal(reducedTransactions['Stefan']['Thijs'].amount.toFixed(2), 9.15);
    assert.equal(reducedTransactions['Stefan']['Danny'].amount.toFixed(2), 29.7);
    assert.equal(reducedTransactions['Stefan']['Den'].amount.toFixed(2), 0);

    assert.equal(reducedTransactions['Den']['Thijs'].amount.toFixed(2), 32.2);
    assert.equal(reducedTransactions['Den']['Danny'].amount.toFixed(2), 19.65);

    assert.equal(reducedTransactions['Thijs']['Danny'].amount.toFixed(2), 0);
  });
});
