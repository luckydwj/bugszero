import { Player } from "./player";

export class Game {
  rockQuestions: any[];
  isGettingOutOfPenaltyBox: boolean;
  currentPlayer: number;
  sportsQuestions: any[];
  scienceQuestions: any[];
  inPenaltyBox: any[];
  popQuestions: any[];
  players: any[];

  constructor() {
    this.players = [];
    this.inPenaltyBox = new Array(6);

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
    this.inPenaltyBox[this.players.length - 1] = false;

    console.log(`They are player number ${this.players.length}`);

    return true;
  }

  currentCategory() {
    const playerPlaces = this.getCurrentPlayerPlaces();
    if (playerPlaces == 0 || playerPlaces == 4 || playerPlaces == 8)
      return "Pop";
    if (playerPlaces == 1 || playerPlaces == 5 || playerPlaces == 9)
      return "Science";
    if (playerPlaces == 2 || playerPlaces == 6 || playerPlaces == 10)
      return "Sports";
    return "Rock";
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

    if (this.inPenaltyBox[this.currentPlayer]) {
      if (roll % 2 != 0) {
        this.isGettingOutOfPenaltyBox = true;

        console.log(
          `${this.getCurrentPlayerName()} is getting out of the penalty box`
        );
        this._movePlayerAndAskQuestion(roll);
      } else {
        console.log(
          `${this.getCurrentPlayerName()} is not getting out of the penalty box`
        );
        this.isGettingOutOfPenaltyBox = false;
      }
    } else {
      this._movePlayerAndAskQuestion(roll);
    }
  }

  _movePlayerAndAskQuestion(roll) {
    this.getCurrentPlayer().updatePlace(roll);
    this.askQuestion();
  }

  wasCorrectlyAnswered() {
    if (this.inPenaltyBox[this.currentPlayer]) {
      if (this.isGettingOutOfPenaltyBox) {
        return this.correctAnswer();
      } else {
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
        return true;
      }
    } else {
      return this.correctAnswer();
    }
  }

  correctAnswer() {
    console.log("Answer was correct!!!!");
    this.currentPlayer += 1;
    if (this.currentPlayer == this.players.length) this.currentPlayer = 0;

    this.getCurrentPlayer().addValue();
    console.log(
      `${this.getCurrentPlayerName()} now has ${this.getCurrentPlayerValue()} Gold Coins.`
    );

    return !(this.getCurrentPlayerValue() == 6);
  }

  wrongAnswer() {
    console.log("Question was incorrectly answered");
    console.log(`${this.getCurrentPlayerName()} was sent to the penalty box`);
    this.inPenaltyBox[this.currentPlayer] = true;

    this.currentPlayer += 1;
    if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
    return true;
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

  getCurrentPlayerValue() {
    return this.getCurrentPlayer().goldCoins;
  }
}
