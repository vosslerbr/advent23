import fs from "fs";
import { filterOutNonNumeric } from "./helpers/filterOutNonNumeric";
import { createTwoDigitNum } from "./helpers/createTwoDigitNum";

const main = () => {
  try {
    // read each line of ./input.txt and log it
    const text = fs.readFileSync("./day1/input.txt", "utf-8");

    const lines = text.split("\n");

    // array of 2 digit numbers, combines the first and last digit in the line
    // if only one digit present, its used twice
    const numbers = lines.reduce((acc: number[], line) => {
      // make line array of characters
      const splitLine = line.split("");

      // filter out non-numeric values, and the return character
      //? ['3', '4', '8']
      const digitsArr = splitLine.filter(filterOutNonNumeric);

      // if no digits, do nothing
      if (!digitsArr.length) return acc;

      const twoDigitNum = createTwoDigitNum(digitsArr);

      acc.push(twoDigitNum);

      return acc;
    }, []);

    // sum the numbers, this is the final answer
    const finalSum = numbers.reduce((acc, number) => {
      return (acc += number);
    }, 0);

    console.log(finalSum);
  } catch (error) {
    console.error(error);
  }
};

main();

// correct answer: 54630
