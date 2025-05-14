type LogStepParams = {
  title: string;
  prevAmount: number;
  discount: number;
  newAmount: number;
};

export const logStep = ({
  title,
  prevAmount,
  discount,
  newAmount,
}: LogStepParams) => {
  const format = (num: number) => num.toLocaleString("ko-KR") + "원";
  const color = (text: string) => `\x1b[36m${text}\x1b[0m`;

  console.log(
    `\n${color(`[${title}]`)}\n` +
      `- 적용 전 금액: ${format(prevAmount)}\n` +
      `- 할인/차감 금액: ${format(discount)}\n` +
      `- 적용 후 금액: ${format(newAmount)}`
  );
};
