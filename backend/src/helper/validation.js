const validation = {
  isString: (data) => {
    if (typeof data === 'string') return true;
    return false;
  },
  isNumber: (data) => {
    if (typeof data === 'number') return true;
    return false;
  },
};

module.exports = validation;
