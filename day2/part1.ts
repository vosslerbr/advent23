import fs from "fs";
import { sumNumArray } from "./helpers/sumNumArray";

// Allowed:
// 12 red
// 13 green
// 14 blue

const main = () => {
  try {
    // read each line of ./input.txt and log it
    const text = fs.readFileSync("./input.txt", "utf-8");

    const lines = text.split("\r");

    const possibleGames = lines.reduce((acc: number[], line) => {
      console.log("line: ", line);

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

      const gameIsPossible = handfulsSplit.reduce((result, handful) => {
        if (!result) return result;

        const allowed: {
          [key: string]: number;
        } = {
          red: 12,
          green: 13,
          blue: 14,
        };
        // Allowed:
        // 12 red
        // 13 green
        // 14 blue
        const handfulIsPossible = handful.reduce((handfulResult, color) => {
          if (!handfulResult) return handfulResult; // if already false, skip

          const [quantity, label] = color.split(" ");

          const colorValue = Number(quantity);

          const isAllowed = colorValue <= allowed[label];

          return isAllowed;
        }, true);

        console.log("handful: ", handful);
        console.log("handfulIsPossible: ", handfulIsPossible);

        return handfulIsPossible;
      }, true);

      console.log("gameNumber: ", gameNumber);
      console.log("handfulsSplit: ", handfulsSplit);

      if (gameIsPossible) {
        acc.push(gameNumber);
      }

      return acc;
    }, []);

    console.log(possibleGames);

    const answer = sumNumArray(possibleGames);

    console.log(answer);
  } catch (error) {
    console.error(error);
  }
};

main();
