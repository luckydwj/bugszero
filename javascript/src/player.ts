/**
 *  Created by daiwenjuan on 2020/2/26 16:42.
 */
export class Player {
  playerName: string;
  constructor(name) {
    this.playerName = name;
  }

  get name() {
    return this.playerName;
  }
}
