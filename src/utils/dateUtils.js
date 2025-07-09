exports.getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

exports.formatDateTime = (date) => {
  return new Date(date).toISOString();
};
