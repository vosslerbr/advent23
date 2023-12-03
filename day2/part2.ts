import fs from "fs";
import { sumNumArray } from "./helpers/sumNumArray";

const main = () => {
  try {
    // read each line of ./input.txt and log it
    const text = fs.readFileSync("./input.txt", "utf-8");

    const lines = text.split("\r");

    const minimumObjects = lines.reduce((acc: { [key: string]: number }[], line) => {
      const handfuls = line.split(/: |; /);
      const gameTitle = handfuls.shift();

      if (!gameTitle) return acc;

      const gameNumber = Number(gameTitle.replace("Game ", ""));

      const handfulsSplit = handfuls.map((handful) => {
        return handful.split(", ").sort((a, b) => {
          const spaceIndexA = a.indexOf(" ");
          const spaceIndexB = b.indexOf(" ");

          const colorA = a.substring(spaceIndexA);
          const colorB = b.substring(spaceIndexB);

          // sort R, G, B
          return colorB.localeCompare(colorA);
        });
      });

      console.log("gameNumber: ", gameNumber);
      console.log("handfulsSplit: ", handfulsSplit);

      const minimums = handfulsSplit.reduce(
        (result: { [key: string]: number }, handful) => {
          handful.forEach((color) => {
            const [quantity, label] = color.split(" ");

            const colorValue = Number(quantity);

            const currMinForColor = result[label];

            if (currMinForColor < colorValue) {
              result[label] = colorValue;
            }
          });

          return result;
        },
        { red: 0, green: 0, blue: 0 }
      );

      acc.push(minimums);

      return acc;
    }, []);

    const total = minimumObjects.reduce((acc, curr) => {
      const power = curr.red * curr.green * curr.blue;

      return (acc += power);
    }, 0);

    console.log(minimumObjects);
    console.log(total);
  } catch (error) {
    console.error(error);
  }
};

main();
