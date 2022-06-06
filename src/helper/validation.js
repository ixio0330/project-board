const validation = {
  string: (data) => {
    if (typeof data === 'string') return true;
    return false;
  },
  number: (data) => {
    if (typeof data === 'number') return true;
    return false;
  },
};

module.exports = validation;
