export class Game {
  rockQuestions: any[];
  isGettingOutOfPenaltyBox: boolean;
  currentPlayer: number;
  sportsQuestions: any[];
  scienceQuestions: any[];
  inPenaltyBox: any[];
  popQuestions: any[];
  value: any[];
  places: any[];
  players: any[];

  constructor() {
    this.players = [];
    this.places = new Array(6);
    this.value = new Array(6);
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
    this.players.push(playerName);
    this.places[this.players.length - 1] = 0;
    this.value[this.players.length - 1] = 0;
    this.inPenaltyBox[this.players.length - 1] = false;

    console.log(`${playerName} was added`);
    console.log(`They are player number ${this.players.length}`);

    return true;
  }

  getCurrentPlayerPlaces() {
    return this.places[this.currentPlayer];
  }

  currentCategory() {
    if (this.getCurrentPlayerPlaces() == 0) return "Pop";
    if (this.getCurrentPlayerPlaces() == 4) return "Pop";
    if (this.getCurrentPlayerPlaces() == 8) return "Pop";
    if (this.getCurrentPlayerPlaces() == 1) return "Science";
    if (this.getCurrentPlayerPlaces() == 5) return "Science";
    if (this.getCurrentPlayerPlaces() == 9) return "Science";
    if (this.getCurrentPlayerPlaces() == 2) return "Sports";
    if (this.getCurrentPlayerPlaces() == 6) return "Sports";
    if (this.getCurrentPlayerPlaces() == 10) return "Sports";
    return "Rock";
  }

  askQuestion() {
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

  getCurrentPlayer() {
    return this.players[this.currentPlayer];
  }

  roll(roll) {
    console.log(`${this.getCurrentPlayer()} is the current player`);
    console.log(`They have rolled a ${roll}`);

    if (this.inPenaltyBox[this.currentPlayer]) {
      if (roll % 2 != 0) {
        this.isGettingOutOfPenaltyBox = true;

        console.log(
          `${this.getCurrentPlayer()} is getting out of the penalty box`
        );
        this._movePlayerAndAskQuestion(roll);
      } else {
        console.log(
          `${this.getCurrentPlayer()} is not getting out of the penalty box`
        );
        this.isGettingOutOfPenaltyBox = false;
      }
    } else {
      this._movePlayerAndAskQuestion(roll);
    }
  }

  _movePlayerAndAskQuestion(roll) {
    this.places[this.currentPlayer] = this.getCurrentPlayerPlaces() + roll;
    if (this.places[this.currentPlayer] > 11) {
      this.places[this.currentPlayer] = this.getCurrentPlayerPlaces() - 12;
    }

    console.log(
      `${this.getCurrentPlayer()}'s new location is ${this.getCurrentPlayerPlaces()}`
    );
    console.log(`The category is ${this.currentCategory()}`);
    this.askQuestion();
  }

  wasCorrectlyAnswered() {
    if (this.inPenaltyBox[this.currentPlayer]) {
      if (this.isGettingOutOfPenaltyBox) {
        console.log("Answer was correct!!!!");
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length) this.currentPlayer = 0;

        this.value[this.currentPlayer] += 1;
        console.log(
          `${this.getCurrentPlayer()} now has ${
            this.value[this.currentPlayer]
          } Gold Coins.`
        );

        return !(this.value[this.currentPlayer] == 6);
      } else {
        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
        return true;
      }
    } else {
      console.log("Answer was correct!!!!");

      this.currentPlayer += 1;
      if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
      this.value[this.currentPlayer] += 1;
      console.log(
        `${this.getCurrentPlayer()} now has ${
          this.value[this.currentPlayer]
        } Gold Coins.`
      );

      return !(this.value[this.currentPlayer] == 6);
    }
  }

  wrongAnswer() {
    console.log("Question was incorrectly answered");
    console.log(`${this.getCurrentPlayer()} was sent to the penalty box`);
    this.inPenaltyBox[this.currentPlayer] = true;

    this.currentPlayer += 1;
    if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
    return true;
  }
}
