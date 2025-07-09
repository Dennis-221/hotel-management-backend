exports.isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

exports.capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
