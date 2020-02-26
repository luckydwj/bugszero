/**
 *  Created by daiwenjuan on 2020/2/26 15:42.
 */
import { Game } from "./game";
export class Player extends Game {
  name;
  constructor(name) {
    super();
    this.name = name;
  }

  add() {
    this.players.push(this.name);
    this.position[this.players.length - 1] = 0;
    this.value[this.players.length - 1] = 0;
    this.inPenaltyBox[this.players.length - 1] = false;

    console.log(`${this.name} was added`);
    console.log(`They are player number ${this.players.length}`);

    return true;
  }
}
