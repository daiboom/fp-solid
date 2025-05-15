import { PaymentRequest, PaymentResult } from "./types";
import {
  applyBaseDiscount,
  applyAdditionalDiscount,
  applyPoints,
  applyCardDiscount,
} from "./calculations";

// 결제 처리 파이프라인 (DIP: 의존성 역전 원칙, OCP: pipeline 확장 가능)
export const processPayment = (request: PaymentRequest): PaymentResult => {
  
  const pipeline = [
    (result: PaymentResult) =>
      applyAdditionalDiscount(result, request.additionalDiscountRate),
    (result: PaymentResult) => applyPoints(result, request.usedPoints),
    (result: PaymentResult) =>
      applyCardDiscount(result, request.cardDiscountRate),
  ];

  return pipeline.reduce(
    (result, fn) => fn(result),
    applyBaseDiscount(request)
  );
};
