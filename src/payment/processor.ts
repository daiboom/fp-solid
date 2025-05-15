import { PaymentRequest, PaymentResult } from "./types";
import {
  applyBaseDiscount,
  applyAdditionalDiscount,
  applyPoints,
  applyCardDiscount,
} from "./calculations";
import { withLogging } from "./utils";

type PipeLineStep<T, U> = (input: T) => U;

export const processPayment = (request: PaymentRequest): PaymentResult => {
  // 1. 기본 할인 단계 (PaymentRequest → PaymentResult)
  const initialStep = withLogging(
    () => applyBaseDiscount(request),
    "기본 할인 적용"
  )();

  // 2. 후속 단계 (PaymentResult → PaymentResult)
  const processingSteps: PipeLineStep<PaymentResult, PaymentResult>[] = [
    withLogging(
      (result) =>
        applyAdditionalDiscount(result, request.additionalDiscountRate),
      "추가 할인 적용"
    ),
    withLogging(
      (result) => applyCardDiscount(result, request.cardDiscountRate),
      "카드사 할인 적용"
    ),
    withLogging(
      (result) => applyPoints(result, request.usedPoints),
      "포인트 사용"
    ),
  ];

  return processingSteps.reduce((acc, step) => step(acc), initialStep);
};
