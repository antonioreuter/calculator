'use strict';


const chai = require('chai');
const chaiString = require('chai-string');

chai.use(chaiString);
const { assert } = chai;

const Transaction = require('../../../src/models/transaction');
const reduceBiDirectionalDebit = require('../../../src/services/calculator/reduceBiDirectionalDebit');


describe('reduceBiDirectionalDebit', () => {
  it('When we try to reduce the bi directional debits', () => {
    const transactions = [];
    transactions.push(new Transaction({ debtor: 'Thijs', creditor: 'Den', amount: 15 }));
    transactions.push(new Transaction({ debtor: 'Thijs', creditor: 'Stefan', amount: 15 }));
    transactions.push(new Transaction({ debtor: 'Stefan', creditor: 'Thijs', amount: 15 }));
    transactions.push(new Transaction({ debtor: 'Den', creditor: 'Thijs', amount: 20 }));
    transactions.push(new Transaction({ debtor: 'Thijs', creditor: 'Danny', amount: 20 }));
    transactions.push(new Transaction({ debtor: 'Danny', creditor: 'Thijs', amount: 10 }));

    const reducedTransactions = reduceBiDirectionalDebit(transactions);

    assert.equal(reducedTransactions['Thijs']['Danny'].amount, 10);
    assert.equal(reducedTransactions['Den']['Thijs'].amount, 5);
    assert.deepEqual(reducedTransactions['Danny'], {});
    assert.deepEqual(reducedTransactions['Stefan'], {});
  });
});
