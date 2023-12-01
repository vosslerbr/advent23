import fs from "fs";

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
      const digitsArr = splitLine.filter((character) => {
        return !isNaN(Number(character)) && character !== "\r";
      });

      // if no digits, do nothing
      if (!digitsArr.length) return acc;

      // get first and last digit from digits array
      // same digit used twice if array is only 1 in length
      const firstNum = digitsArr[0];
      const lastNum = digitsArr[digitsArr.length - 1];

      // create final number, i.e. ['3', '4', '8'] becomes 38
      const combinedNum = Number(`${firstNum}${lastNum}`);

      acc.push(combinedNum);

      return acc;
    }, []);

    // sum the numbers, this is the final answer
    const answerTotal = numbers.reduce((acc, number) => {
      return (acc += number);
    }, 0);

    console.log(answerTotal);
  } catch (error) {
    console.error(error);
  }
};

main();

// correct answer: 54630
