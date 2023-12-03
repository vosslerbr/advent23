export const sumNumArray = (numbers: number[]) => {
  // sum the numbers, this is the final answer
  const sum = numbers.reduce((acc, number) => {
    return (acc += number);
  }, 0);

  return sum;
};
