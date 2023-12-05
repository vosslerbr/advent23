import fs from "fs";
import { sumNumArray } from "../day2/helpers/sumNumArray";

const main = () => {
  try {
    const text = fs.readFileSync("./input.txt", "utf-8");
    // const textExample = fs.readFileSync("./inputExample.txt", "utf-8");

    const lines = text.split("\r");
    // const firstLine = [lines[0]];

    const lineCharArrays = lines.map((line, index) => {
      const doubleSpaceRemoved = line.replace(/  |   /g, " ");

      const [winningNumbers, myNumbers] = doubleSpaceRemoved.split(" | ");

      const winningNumbersArr = winningNumbers
        .replace(/  /g, " ")
        .substring(winningNumbers.indexOf(": "))
        .trim()
        .split(" ");
      const myNumbersArr = myNumbers.replace(/  /g, " ").split(" ");

      return { lineNumber: index, winningNumbers: winningNumbersArr, myNumbers: myNumbersArr };
    });

    const answer = lineCharArrays.reduce((acc, lineObj) => {
      console.log(lineObj);

      const numberOfWinningNumbers = lineObj.myNumbers.reduce((count, number) => {
        if (lineObj.winningNumbers.includes(number)) {
          console.log("winner: ", number);

          count++;
        }

        return count;
      }, 0);

      console.log("numberOfWinningNumbers: ", numberOfWinningNumbers);

      if (numberOfWinningNumbers === 0) return acc;

      const power = numberOfWinningNumbers - 1;

      console.log("power: ", power);

      const final = 2 ** power;

      console.log("final: ", final);

      return (acc += final);
    }, 0);

    console.log(answer);
  } catch (error) {
    console.error(error);
  }
};

main();
