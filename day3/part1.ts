import fs from "fs";
import { sumNumArray } from "../day2/helpers/sumNumArray";

const main = () => {
  try {
    const text = fs.readFileSync("./input.txt", "utf-8");
    const textExample = fs.readFileSync("./inputExample.txt", "utf-8");

    const lines = text.split("\r");

    const lineCharArrays = lines.map((line) => {
      return line.split("").filter((char) => char !== "\n" && char !== "\r");
    });

    console.log(lineCharArrays);

    const total = lineCharArrays.reduce((acc: number, lineArr, lineIndex) => {
      const indexesToSkip: number[] = [];

      const numbersInLine = lineArr.reduce((numbers: number[], char, charIndex) => {
        const isANumber = !isNaN(Number(char));

        if (!isANumber || indexesToSkip.includes(charIndex)) return numbers;

        const prevLineIndex = lineIndex - 1;
        const nextLineIndex = lineIndex + 1;

        const prevCharIndex = charIndex - 1;
        const nextCharIndex = charIndex + 1;

        // grab the 8 spots around the number
        const topLeft = lineCharArrays?.[prevLineIndex]?.[prevCharIndex];
        const topMid = lineCharArrays?.[prevLineIndex]?.[charIndex];
        const topRight = lineCharArrays?.[prevLineIndex]?.[nextCharIndex];

        const midLeft = lineCharArrays?.[lineIndex]?.[prevCharIndex];
        const midRight = lineCharArrays?.[lineIndex]?.[nextCharIndex];

        const botLeft = lineCharArrays?.[nextLineIndex]?.[prevCharIndex];
        const botMid = lineCharArrays?.[nextLineIndex]?.[charIndex];
        const botRight = lineCharArrays?.[nextLineIndex]?.[nextCharIndex];

        const surroundingChars = [
          topLeft,
          topMid,
          topRight,
          midLeft,
          midRight,
          botLeft,
          botMid,
          botRight,
        ];

        const hasSpecialChar =
          surroundingChars.filter((x) => {
            return x && x !== "." && isNaN(Number(x));
          }).length > 0;

        if (!hasSpecialChar) return numbers;

        // if we get here, we need to construct the number this character is from
        let leftChars: string[] = [];
        let rightChars: string[] = [];

        // get left chars
        for (let i = charIndex - 1; i > -1; i--) {
          const currentChar = lineArr[i];
          const charAsNum = Number(currentChar);
          if (isNaN(charAsNum)) break;

          if (!indexesToSkip.includes(i)) {
            indexesToSkip.push(i);
          }
          leftChars.unshift(currentChar);
        }

        // get right chars
        for (let i = charIndex + 1; i < lineArr.length; i++) {
          const currentChar = lineArr[i];
          const charAsNum = Number(currentChar);
          if (isNaN(charAsNum)) break;

          if (!indexesToSkip.includes(i)) {
            indexesToSkip.push(i);
          }

          rightChars.push(currentChar);
        }

        const combinedChars = `${leftChars.join("")}${char}${rightChars.join("")}`;

        const finalNum = Number(combinedChars);

        console.log("indexesToSkip: ", indexesToSkip);

        numbers.push(finalNum);

        return numbers;
      }, []);

      console.log(`numbersInLine ${lineIndex}: `, numbersInLine);

      const lineSum = sumNumArray(numbersInLine);

      console.log(lineSum);

      return (acc += lineSum);
    }, 0);

    console.log("total: ", total);
  } catch (error) {
    console.error(error);
  }
};

main();
