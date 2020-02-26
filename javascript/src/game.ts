export class Game {
  rockQuestions: any[] = [];
  sportsQuestions: any[] = [];
  scienceQuestions: any[] = [];
  popQuestions: any[] = [];

  inPenaltyBox: any[];

  isGettingOutOfPenaltyBox: boolean = false;
  currentPlayer: number = 0;

  value: any[];
  position: any[];
  players: any[];

  constructor() {
    this.players = [];
    this.position = new Array(6);
    this.value = new Array(6);
    this.inPenaltyBox = new Array(6);

    for (let i = 0; i < 50; i++) {
      this.popQuestions.push("Pop Question " + i);
      this.scienceQuestions.push("Science Question " + i);
      this.sportsQuestions.push("Sports Question " + i);
      this.rockQuestions.push("Rock Question " + i);
    }
  }

  add(playerName) {
    this.players.push(playerName);
    this.position[this.players.length - 1] = 0;
    this.value[this.players.length - 1] = 0;
    this.inPenaltyBox[this.players.length - 1] = false;

    console.log(`${playerName} was added`);
    console.log(`They are player number ${this.players.length}`);

    return true;
  }

  currentCategory() {
    const places = this.position[this.currentPlayer];
    if (places == 0 || places == 4 || places == 8) return "Pop";
    if (places == 1 || places == 5 || places == 9) return "Science";
    if (places == 2 || places == 6 || places == 10) return "Sports";
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

  roll(roll) {
    console.log(`${this.players[this.currentPlayer]} is the current player`);
    console.log(`They have rolled a ${roll}`);

    if (this.inPenaltyBox[this.currentPlayer]) {
      if (roll % 2 != 0) {
        this.isGettingOutOfPenaltyBox = true;

        console.log(
          `${
            this.players[this.currentPlayer]
          } is getting out of the penalty box`
        );
        this._movePlayerAndAskQuestion(roll);
      } else {
        console.log(
          `${
            this.players[this.currentPlayer]
          } is not getting out of the penalty box`
        );
        this.isGettingOutOfPenaltyBox = false;
      }
    } else {
      this._movePlayerAndAskQuestion(roll);
    }
  }

  _movePlayerAndAskQuestion(roll) {
    this.position[this.currentPlayer] =
      this.position[this.currentPlayer] + roll;
    if (this.position[this.currentPlayer] > 11) {
      this.position[this.currentPlayer] =
        this.position[this.currentPlayer] - 12;
    }

    console.log(
      `${this.players[this.currentPlayer]}'s new location is ${
        this.position[this.currentPlayer]
      }`
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
          `${this.players[this.currentPlayer]} now has ${
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
        `${this.players[this.currentPlayer]} now has ${
          this.value[this.currentPlayer]
        } Gold Coins.`
      );

      return !(this.value[this.currentPlayer] == 6);
    }
  }

  wrongAnswer() {
    console.log("Question was incorrectly answered");
    console.log(
      `${this.players[this.currentPlayer]} was sent to the penalty box`
    );
    this.inPenaltyBox[this.currentPlayer] = true;

    this.currentPlayer += 1;
    if (this.currentPlayer == this.players.length) this.currentPlayer = 0;
    return true;
  }
}
