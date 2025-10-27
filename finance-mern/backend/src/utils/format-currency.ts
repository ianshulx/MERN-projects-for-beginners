// Convert dollars to cents when saving
export function convertToCents(amount: number) {
  return Math.round(amount * 100);
}

// Convert cents to dollars when retrieving
//convertFromCents
export function convertToDollarUnit(amount: number) {
  return amount / 100;
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
