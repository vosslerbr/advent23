import fs from "fs";
import { digitMap, digitsToFind } from "./digitSpellings";

const main = () => {
  try {
    // read each line of ./input.txt and log it
    const text = fs.readFileSync("./day1/input.txt", "utf-8");

    const lines = text.split("\n");

    // array of 2 digit numbers, combines the first and last digit in the line
    // if only one digit present, its used twice
    const numbers = lines.reduce((acc: number[], line) => {
      const digitIndexes = digitsToFind
        .reduce((indexes: { finalDigit: number; index: number }[], digitString) => {
          const index = line.indexOf(digitString);
          const lastIndex = line.lastIndexOf(digitString);

          if (index >= 0) {
            const mappedDigit = digitMap[digitString];

            indexes.push({
              finalDigit: mappedDigit,
              index,
            });

            if (lastIndex !== index) {
              indexes.push({
                finalDigit: mappedDigit,
                index: lastIndex,
              });
            }
          }

          return indexes;
        }, [])
        .sort((a, b) => a.index - b.index);

      // if no digits, do nothing
      if (!digitIndexes.length) return acc;

      // get first and last digit from digits array
      // same digit used twice if array is only 1 in length
      const firstNum = digitIndexes[0].finalDigit;
      const lastNum = digitIndexes[digitIndexes.length - 1].finalDigit;

      // create final number, i.e. ['3', '4', '8'] becomes 38
      const combinedNum = Number(`${firstNum}${lastNum}`);

      acc.push(combinedNum);

      return acc;
    }, []);

    // sum the numbers, this is the final answer
    const answerTotal = numbers.reduce((acc, number) => {
      return (acc += number);
    }, 0);

    console.log("TOTAL: ", answerTotal);
  } catch (error) {
    console.error(error);
  }
};

main();

// correct answer: 54770
