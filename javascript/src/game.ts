import { Player } from "./player";
import { Simulator } from "./Simulator";

export class Game {
  rockQuestions: any[];
  isGettingOutOfPenaltyBox: boolean;
  currentPlayer: number;
  sportsQuestions: any[];
  scienceQuestions: any[];
  popQuestions: any[];
  players: any[];

  constructor() {
    this.players = [];

    this.popQuestions = [];
    this.scienceQuestions = [];
    this.sportsQuestions = [];
    this.rockQuestions = [];

    this.currentPlayer = 0;
    this.isGettingOutOfPenaltyBox = false;

    for (let i = 0; i < 50; i++) {
      this.popQuestions.push("Pop Question " + i);
      this.scienceQuestions.push("Science Question " + i);
      this.sportsQuestions.push("Sports Question " + i);
      this.rockQuestions.push(this.createRockQuestion(i));
    }
  }

  add(playerName) {
    this.players.push(new Player(playerName));
    console.log(`They are player number ${this.players.length}`);
    return true;
  }

  start(simulator: Simulator) {
    let notAWinner = false;
    do {
      const shouldAnswerQuestionThisRound = this.roll(
        simulator.simulateRolling()
      );
      const isWrongAnswer = simulator.simulateAnswering();
      if (shouldAnswerQuestionThisRound) {
        notAWinner = isWrongAnswer ? this.wrongAnswer() : this.correctAnswer();
      }
      this.setNextPlayer();
    } while (notAWinner);
  }

  currentCategory() {
    const playerPlaces = this.getCurrentPlayerPlaces();
    switch (playerPlaces) {
      case 0:
      case 4:
      case 8: {
        return "Pop";
      }
      case 1:
      case 5:
      case 9: {
        return "Science";
      }
      case 2:
      case 6:
      case 10: {
        return "Sports";
      }
      default:
        return "Rock";
    }
  }

  askQuestion() {
    console.log(`The category is ${this.currentCategory()}`);
    if (this.currentCategory() == "Pop") {
      console.log(this.popQuestions.shift());
    }
    if (this.currentCategory() == "Science") {
      console.log(this.scienceQuestions.shift());
    }
    if (this.currentCategory() == "Sports") {
      console.log(this.sportsQuestions.shift());
    }
    if (this.currentCategory() == "Rock") {
      console.log(this.rockQuestions.shift());
    }
  }

  createRockQuestion(index) {
    return `Rock Question ${index}`;
  }

  roll(roll) {
    console.log(`${this.getCurrentPlayerName()} is the current player`);
    console.log(`They have rolled a ${roll}`);

    if (this.getCurrentPlayer().isPenaltyBox) {
      if (roll % 2 != 0) {
        this.getCurrentPlayer().freedFromPenaltyBox();
        this._movePlayerAndAskQuestion(roll);
        return true;
      } else {
        console.log(
          `${this.getCurrentPlayerName()} is not getting out of the penalty box`
        );
        return false;
      }
    } else {
      this._movePlayerAndAskQuestion(roll);
      return true;
    }
  }

  _movePlayerAndAskQuestion(roll) {
    this.getCurrentPlayer().updatePlace(roll);
    this.askQuestion();
  }

  correctAnswer() {
    console.log("Answer was correct!!!!");
    this.getCurrentPlayer().addValue();
    return this.didCurrentPlayerWin();
  }

  private didCurrentPlayerWin() {
    return this.getCurrentPlayer().didWin();
  }

  wrongAnswer() {
    console.log("Question was incorrectly answered");
    this.getCurrentPlayer().updatePensltyBox();
    return true;
  }

  setNextPlayer() {
    this.currentPlayer += 1;
    if (this.currentPlayer == this.players.length) {
      this.currentPlayer = 0;
    }
  }

  getCurrentPlayerPlaces() {
    return this.getCurrentPlayer().place;
  }
  getCurrentPlayer() {
    return this.players[this.currentPlayer];
  }
  getCurrentPlayerName() {
    return this.getCurrentPlayer().name;
  }
}
