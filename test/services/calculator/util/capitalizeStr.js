'use strict';

const chai = require('chai');
const chaiString = require('chai-string');

chai.use(chaiString);
const { assert } = chai;

const capitalizeStr = require('../../../../src/services/calculator/util/capitalizeStr');

describe('capitalizeStr', () => {
  it('When we try to capitalize a name', () => {
    const name = 'thijs';

    assert.equal(capitalizeStr(name), 'Thijs');
  });

  it('When we try to capitalize a name that is already capitalized', () => {
    const name = 'Thijs';

    assert.equal(capitalizeStr(name), 'Thijs');
  });

  it('When we try to capitalize a name with some uppercase letters', () => {
    const name = 'tHIjs';

    assert.equal(capitalizeStr(name), 'THIjs');
  });

  it('When we try to capitalize an empty string', () => {
    assert.equal(capitalizeStr(''), '');
  });

  it('When we try to capitalize and the value is not a string', () => {
    try {
      capitalizeStr(10);
      assert.fail();
    } catch(err) {
      assert.equal(err.message, 'Illegal argument. Unsupported type.');
    }
  });
});
