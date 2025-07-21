const transformText = (value, type) => {
  switch (type) {
    case 'TO_UPPER_CASES':
      return value.toUpperCase();
    case 'TO_LOWER_CASES':
      return value.toLowerCase();
    default:
      return value.toUpperCase();
  }
};

module.exports = { transformText };
