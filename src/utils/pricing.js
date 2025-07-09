exports.calculateRoomTotal = (pricePerNight, nights, discount = 0) => {
  const subtotal = pricePerNight * nights;
  return Math.max(subtotal - discount, 0);
};

exports.applyTaxes = (subtotal, taxRate = 0.09) => {
  const taxes = +(subtotal * taxRate).toFixed(2);
  return {
    taxes,
    total: +(subtotal + taxes).toFixed(2),
  };
};
