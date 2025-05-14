import { processPayment } from "./processor";
import { PaymentRequest, PaymentResult } from "./types";

// 테스트 유틸 함수
const runTestCase = (
  testName: string,
  request: PaymentRequest,
  expected: number
) => {
  const colorizeText = (text: string, colorCode: string) =>
    `\x1b[${colorCode}${text}\x1b[0m`;

  console.log(
    `\n\n${colorizeText("➤", "1;33m")} ${colorizeText(testName, "1;93m")}`
  );

  const result: PaymentResult = processPayment(request);

  console.log(colorizeText("━".repeat(40), "90m"));
  console.log(result);

  const pass = result.finalAmount === expected;
  const status = pass
    ? colorizeText("✓ PASS", "1;32m")
    : colorizeText("✗ FAIL", "1;31m");

  console.log(`\n${status}`);

  if (!pass) {
    console.error(
      colorizeText(`  예상값: ${expected.toLocaleString()}원`, "31m") +
        colorizeText(
          `  실제값: ${result.finalAmount.toLocaleString()}원`,
          "31m"
        )
    );
  }
};

// 테스트 데이터
const BASE_AMOUNT = 100000;

runTestCase(
  "Case 1: 기본 할인",
  {
    amount: BASE_AMOUNT,
    baseDiscountRate: 0.1,
    additionalDiscountRate: 0,
    usedPoints: 0,
    cardDiscountRate: 0,
  },
  90000
);

runTestCase(
  "Case 2: 기본 할인 + 추가 할인",
  {
    amount: BASE_AMOUNT,
    baseDiscountRate: 0.1,
    additionalDiscountRate: 0.05,
    usedPoints: 0,
    cardDiscountRate: 0,
  },
  85500
);

runTestCase(
  "Case 3: 기본 할인 + 포인트 사용",
  {
    amount: BASE_AMOUNT,
    baseDiscountRate: 0.1,
    additionalDiscountRate: 0,
    usedPoints: 20000,
    cardDiscountRate: 0,
  },
  70000
);

runTestCase(
  "Case 4: 기본 할인 + 추가 할인 + 포인트 사용",
  {
    amount: BASE_AMOUNT,
    baseDiscountRate: 0.1,
    additionalDiscountRate: 0.05,
    usedPoints: 30000,
    cardDiscountRate: 0,
  },
  55500
);

runTestCase(
  "Case 5: 기본 할인 + 카드사 할인",
  {
    amount: BASE_AMOUNT,
    baseDiscountRate: 0.1,
    additionalDiscountRate: 0,
    usedPoints: 0,
    cardDiscountRate: 0.02,
  },
  88200
);

runTestCase(
  "Case 6: 기본 할인 + 추가 할인 + 카드사 할인",
  {
    amount: BASE_AMOUNT,
    baseDiscountRate: 0.1,
    additionalDiscountRate: 0.05,
    usedPoints: 0,
    cardDiscountRate: 0.02,
  },
  83790
);

runTestCase(
  "Case7: 기본 할인 적용 + 추가 할인 적용 + 포인트 사용 + 카드사 할인",
  {
    amount: BASE_AMOUNT,
    baseDiscountRate: 0.1,
    additionalDiscountRate: 0.05,
    usedPoints: 5000,
    cardDiscountRate: 0.02,
  },
  78890
);

// 에러케이스
runTestCase(
  "Case8: 기본 할인 적용 + 추가 할인 적용 + 포인트 사용 + 카드사 할인",
  {
    amount: BASE_AMOUNT,
    baseDiscountRate: 0.1,
    additionalDiscountRate: 0.05,
    usedPoints: 5000,
    cardDiscountRate: 0.02,
  },
  99999 // 의도적으로 잘못된 값
);

