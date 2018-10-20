'use strict';

const capitalizeStr = require('./util/capitalizeStr');

module.exports = (line) => {
  const tokens = line.split(' ');
  const data = {};

  data.amount = tokens[0];
  data.paidBy = capitalizeStr(tokens[1]);
  data.attendees = tokens[2].split(",");

  return data;
};
