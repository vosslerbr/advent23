import fs from "fs";

const main = () => {
  try {
    // const text = fs.readFileSync("./input.txt", "utf-8");
    const textExample = fs.readFileSync("./inputExample.txt", "utf-8");

    const lines = textExample.split("\r");
    // const firstLine = [lines[0]];

    const tickets = lines.map((line, index) => {
      const doubleSpaceRemoved = line.replace(/  |   /g, " ");

      const [winningNumbers, myNumbers] = doubleSpaceRemoved.split(" | ");

      const winningNumbersArr = winningNumbers
        .replace(/  /g, " ")
        .substring(winningNumbers.indexOf(": "))
        .trim()
        .split(" ");
      const myNumbersArr = myNumbers.replace(/  /g, " ").split(" ");

      return { ticketNumber: index, winningNumbers: winningNumbersArr, myNumbers: myNumbersArr };
    });

    // TODO check each line, count number of matches, add the next X lines to the array, repeat
    const allTickets = tickets.reduce(
      (
        acc: {
          ticketNumber: number;
          winningNumbers: string[];
          myNumbers: string[];
        }[],
        ticket,
        index
      ) => {
        const { myNumbers, winningNumbers, ticketNumber } = ticket;

        const numberOfMatches = myNumbers.reduce((count, number) => {
          if (winningNumbers.includes(number)) {
            count++;
          }

          return count;
        }, 0);

        console.log(`ticket ${ticketNumber} has ${numberOfMatches} matches`);

        acc.push(ticket);

        // TODO this is bugged
        for (let i = 1; i <= numberOfMatches; i++) {
          const copiedTicket = tickets[ticketNumber + i];

          console.log(`copied ticket ${ticketNumber + i} for ticket ${ticketNumber} winner`);

          acc.push(copiedTicket);
        }

        return acc;
      },
      []
    );

    // console.log(allTickets);
    console.log(allTickets.length);

    // const answer = tickets.reduce((acc, lineObj, index) => {
    //   console.log(lineObj);

    //   const numberOfWinningNumbers = lineObj.myNumbers.reduce((count, number) => {
    //     if (lineObj.winningNumbers.includes(number)) {
    //       console.log("winner: ", number);

    //       count++;
    //     }

    //     return count;
    //   }, 0);

    //   console.log("numberOfWinningNumbers: ", numberOfWinningNumbers);

    //   if (numberOfWinningNumbers === 0) return acc;

    //   const power = numberOfWinningNumbers - 1;

    //   console.log("power: ", power);

    //   const final = 2 ** power;

    //   console.log("final: ", final);

    //   return (acc += final);
    // }, 0);

    // console.log(answer);
  } catch (error) {
    console.error(error);
  }
};

main();
