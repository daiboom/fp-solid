import { PaymentRequest, PaymentResult } from "./types";
import { logStep } from "./utils";

// 기본 할인 적용 (SRP: 단일 할인 계산)
export const applyBaseDiscount = (req: PaymentRequest): PaymentResult => {
  return {
    originalAmount: req.amount,
    baseDiscount: req.amount * req.baseDiscountRate,
    additionalDiscount: 0,
    pointsUsed: 0,
    cardDiscount: 0,
    finalAmount: req.amount * (1 - req.baseDiscountRate),
  };
};

// 추가 할인 적용 (OCP: 확장 가능한 구조, DIP: 의존성 역전 원칙)
export const applyAdditionalDiscount = (
  prev: PaymentResult,
  rate: number
): PaymentResult => {
  return {
    ...prev,
    additionalDiscount: prev.finalAmount * rate,
    finalAmount: prev.finalAmount * (1 - rate),
  };
};

// 포인트 사용 (LSP: 입력/출력 일관성 유지, SRP: 포인트 사용 계산)
export const applyPoints = (
  prev: PaymentResult,
  points: number
): PaymentResult => {
  return {
    ...prev,
    pointsUsed: Math.min(points, prev.finalAmount),
    finalAmount: Math.max(0, prev.finalAmount - points),
  };
};

// 카드사 할인 (ISP: 필요한 기능만 노출, SRP: 카드사 할인 계산)
export const applyCardDiscount = (
  prev: PaymentResult,
  rate: number
): PaymentResult => {
  return {
    ...prev,
    cardDiscount: prev.finalAmount * rate,
    finalAmount: prev.finalAmount * (1 - rate),
  };
};
