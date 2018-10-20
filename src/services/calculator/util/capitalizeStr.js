'use strict';

module.exports = (s) => {
  if (typeof s !== 'string') throw new Error('Illegal argument. Unsupported type.');
  if (s.trim().length === 0) return '';

  return s.charAt(0).toUpperCase() + s.slice(1);
};
