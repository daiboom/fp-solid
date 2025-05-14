export type PaymentRequest = {
  amount: number;
  baseDiscountRate: number;
  additionalDiscountRate: number;
  usedPoints: number;
  cardDiscountRate: number;
};

export type PaymentResult = {
  originalAmount: number;
  baseDiscount: number;
  additionalDiscount: number;
  pointsUsed: number;
  cardDiscount: number;
  finalAmount: number;
};
