import * as readline from "linebyline";
//var readline = require('linebyline');

class GuessingGame {
  private targetNumber: number;
  private remainingAttempts: number;
  private gameOver: boolean;

  constructor() {
    this.startNewGame();
  }

  private generateRandomNumber(): number {
    return Math.floor(Math.random() * 10) + 1;
  }

  public startNewGame(): void {
    this.targetNumber = this.generateRandomNumber();
    this.remainingAttempts = 5;
    this.gameOver = false;
  }

  public makeGuess(guess: number): string {
    if (this.gameOver) {
      return "The game is over. Start a new game to play again.";
    }

    this.remainingAttempts--;

    if (guess === this.targetNumber) {
      this.gameOver = true;
      return "Congratulations! You've guessed the correct number!";
    } else if (this.remainingAttempts === 0) {
      this.gameOver = true;
      return `Sorry, you're out of attempts. The correct number was ${this.targetNumber}.`;
    } else if (guess < this.targetNumber) {
      return `Wrong guess. The number is higher. You have ${this.remainingAttempts} attempts left.`;
    } else {
      return `Wrong guess. The number is lower. You have ${this.remainingAttempts} attempts left.`;
    }
  }

  public getGameStatus(): string {
    return this.gameOver
      ? "Game Over"
      : `You have ${this.remainingAttempts} attempts remaining.`;
  }
}

function validateInput(input: string): number | null {
  const num = parseInt(input, 10);
  if (isNaN(num) || num < 1 || num > 10) {
    return null;
  }
  return num;
}

function startGameInterface() {
  const game = new GuessingGame();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("Welcome to the Guessing Game!");
  console.log("Try to guess a number between 1 and 10.");

  function askForGuess() {
    rl.question("Enter your guess: ", (input) => {
      const guess = validateInput(input);

      if (guess === null) {
        console.log("Invalid input. Please enter a number between 1 and 10.");
        askForGuess();
      } else {
        const result = game.makeGuess(guess);
        console.log(result);

        if (
          result.includes("Congratulations") ||
          result.includes("Sorry, you're out of attempts")
        ) {
          rl.question("Do you want to play again? (yes/no): ", (answer) => {
            if (answer.toLowerCase() === "yes") {
              game.startNewGame();
              console.log("New game started!");
              askForGuess();
            } else {
              console.log("Thanks for playing!");
              rl.close();
            }
          });
        } else {
          askForGuess();
        }
      }
    });
  }

  askForGuess();
}

// Start the game
startGameInterface();

// For testing purposes, we export the GuessingGame class and validateInput function
export { GuessingGame, validateInput };
