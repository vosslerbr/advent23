import fs from "fs";

const main = () => {
  try {
    // read each line of ./input.txt and log it
    const text = fs.readFileSync("./input.txt", "utf-8");

    const lines = text.split("\n");
    const singleLine = ["eightfivesssxxmgthreethreeone1sevenhnz"];

    // array of 2 digit numbers, combines the first and last digit in the line
    // if only one digit present, its used twice
    const numbers = singleLine.reduce((acc: number[], line) => {
      // make line array of characters
      const splitLine = line.split("");
      console.log("splitLine: ", splitLine);

      // filter out non-numeric values, and the return character
      const digitsArr = splitLine.filter((character) => {
        const isANumber = !isNaN(Number(character));

        const notReturnChar = character !== "\r";

        return isANumber && notReturnChar;
      });

      console.log("digitsArr: ", digitsArr);

      // if no digits, do nothing
      if (!digitsArr.length) return acc;

      // get first and last digit from digits array
      // same digit used twice if array is only 1 in length
      const firstNum = digitsArr[0];
      const lastNum = digitsArr[digitsArr.length - 1];

      // create final number, i.e. ['3', '4', '8'] becomes 38
      const combinedNum = Number(`${firstNum}${lastNum}`); // "11"

      console.log("combinedNum: ", combinedNum);

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
