import { PaymentResult } from "./types";

const CYAN_COLOR = "\x1b[36m";
const RESET_COLOR = "\x1b[0m";
const NUMBER_FORMATTER = new Intl.NumberFormat("ko-KR");

type LogStepParams = {
  title: string;
  prevAmount: number;
  discount: number;
  newAmount: number;
};

const formatCurrency = (num: number) => `${NUMBER_FORMATTER.format(num)}원`;

export const logStep = ({
  title,
  prevAmount,
  discount,
  newAmount,
}: LogStepParams) => {
  console.log(
    `\n${CYAN_COLOR}[${title}]${RESET_COLOR}\n` +
      `- 적용 전 금액: ${formatCurrency(prevAmount)}\n` +
      `- 할인/차감 금액: ${formatCurrency(discount)}\n` +
      `- 적용 후 금액: ${formatCurrency(newAmount)}`
  );
};

const getPrevAmount = (input: unknown): number => {
  if (typeof input !== "object" || input === null) return 0;

  return "finalAmount" in input
    ? (input as PaymentResult).finalAmount
    : (input as { amount: number }).amount;
};

export const withLogging = <T extends (...args: any[]) => PaymentResult>(
  fn: T,
  title: string
) => {
  return (...args: Parameters<T>): PaymentResult => {
    const prevAmount = getPrevAmount(args[0]);
    const result = fn(...args);
    const discount = prevAmount - result.finalAmount;

    logStep({ title, prevAmount, discount, newAmount: result.finalAmount });

    return result;
  };
};
