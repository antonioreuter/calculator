'use strict';

const chai = require('chai');
const chaiString = require('chai-string');

chai.use(chaiString);
const { assert } = chai;

const parser = require('../../../src/services/calculator/parser');
const billToTransactionConverter = require('../../../src/services/calculator/billToTransactionConverter');

describe('billToTransactionConverter', () => {
  it('When we try to convert a bill into transactions', () => {
    const line = '30.00 Thijs Danny,Stefan,Den';
    const bill = parser(line);

    const transactions = billToTransactionConverter(bill);

    assert.equal(transactions.length, 3);
    assert.equal(transactions[0].creditor, 'Thijs');
    transactions.forEach((transaction => assert.equal(transaction.amount, 10.00)));
  });

  it('When we try to convert a bill into transactions where one attendee appears twice', () => {
    const line = '40.00 Thijs Danny,Stefan,Den,Den';
    const bill = parser(line);

    const transactions = billToTransactionConverter(bill);

    assert.equal(transactions.length, 3);
    assert.equal(transactions[0].creditor, 'Thijs');
    assert.equal(transactions[0].amount, 10.00);
    assert.equal(transactions[2].amount, 20.00);
  });

  it('When we try to convert a bill into transactions and who paid the bill appears as one of the attendees', () => {
    const line = '50.00 Thijs Thijs,Danny,Stefan,Den,Den';
    const bill = parser(line);

    const transactions = billToTransactionConverter(bill);

    assert.equal(transactions.length, 3);
    assert.equal(transactions[0].creditor, 'Thijs');
    assert.equal(transactions[0].amount, 10.00);
    assert.equal(transactions[1].amount, 10.00);
    assert.equal(transactions[2].amount, 20.00);
  });

  it('When we try to convert a bill where the names are in lowercase', () => {
    const line = '30.00 thijs danny,stefan,den';
    const bill = parser(line);

    const transactions = billToTransactionConverter(bill);

    assert.strictEqual(transactions[0].creditor, 'Thijs');
    assert.strictEqual(transactions[0].debtor, 'Danny');
    assert.strictEqual(transactions[1].debtor, 'Stefan');
    assert.strictEqual(transactions[2].debtor, 'Den');
  });
});
