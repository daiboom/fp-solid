import { PaymentRequest, PaymentResult } from "./types";
import { logStep } from "./utils";

// 기본 할인 적용 (SRP: 단일 할인 계산)
export const applyBaseDiscount = (req: PaymentRequest): PaymentResult => {
  const baseDiscount = req.amount * req.baseDiscountRate;
  const appliedBaseDiscount = req.amount * (1 - req.baseDiscountRate);

  logStep({
    title: "기본 할인 적용",
    prevAmount: req.amount,
    discount: baseDiscount,
    newAmount: appliedBaseDiscount,
  });

  return {
    originalAmount: req.amount,
    baseDiscount: baseDiscount,
    additionalDiscount: 0,
    pointsUsed: 0,
    cardDiscount: 0,
    finalAmount: appliedBaseDiscount,
  };
};

// 추가 할인 적용 (OCP: 확장 가능한 구조, DIP: 의존성 역전 원칙)
export const applyAdditionalDiscount = (
  prev: PaymentResult,
  rate: number
): PaymentResult => {
  const additionalDiscount = prev.finalAmount * rate;
  const appliedAdditionalDiscount = prev.finalAmount * (1 - rate);

  logStep({
    title: "추가 할인 적용",
    prevAmount: prev.finalAmount,
    discount: additionalDiscount,
    newAmount: appliedAdditionalDiscount,
  });

  return {
    ...prev,
    additionalDiscount: additionalDiscount,
    finalAmount: appliedAdditionalDiscount,
  };
};

// 포인트 사용 (LSP: 입력/출력 일관성 유지, SRP: 포인트 사용 계산)
export const applyPoints = (
  prev: PaymentResult,
  points: number
): PaymentResult => {
  const pointsUsed = Math.min(points, prev.finalAmount);
  const appliedPoints = Math.max(0, prev.finalAmount - points);

  logStep({
    title: "포인트 사용",
    prevAmount: prev.finalAmount,
    discount: pointsUsed,
    newAmount: appliedPoints,
  });

  return {
    ...prev,
    pointsUsed: pointsUsed,
    finalAmount: appliedPoints,
  };
};

// 카드사 할인 (ISP: 필요한 기능만 노출, SRP: 카드사 할인 계산)
export const applyCardDiscount = (
  prev: PaymentResult,
  rate: number
): PaymentResult => {
  const cardDiscount = prev.finalAmount * rate;
  const appliedCardDiscount = prev.finalAmount * (1 - rate);

  logStep({
    title: "카드사 할인 적용",
    prevAmount: prev.finalAmount,
    discount: cardDiscount,
    newAmount: appliedCardDiscount,
  });

  return {
    ...prev,
    cardDiscount: prev.finalAmount * rate,
    finalAmount: appliedCardDiscount,
  };
};
