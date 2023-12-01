export function createTwoDigitNum(digitsArr: string[]): number {
  // get first and last digit from digits array
  // same digit used twice if array is only 1 in length
  const firstIndex = 0;
  const lastIndex = digitsArr.length - 1;

  const firstNum = digitsArr[firstIndex]; //? "3"
  const lastNum = digitsArr[lastIndex]; //? "8"

  //? "38"
  const twoDigitString = `${firstNum}${lastNum}`;

  // cast to number
  const twoDigitNum = Number(twoDigitString);

  return twoDigitNum;
}
