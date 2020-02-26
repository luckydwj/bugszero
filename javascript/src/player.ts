/**
 *  Created by daiwenjuan on 2020/2/26 16:42.
 */
export class Player {
  private readonly playerName: string;
  private _goldCoins: number = 0;
  private _place: number = 0;
  constructor(name) {
    this.playerName = name;
    console.log(`${name} was added`);
  }

  get name() {
    return this.playerName;
  }

  addValue() {
    this._goldCoins += 1;
  }

  get goldCoins(): number {
    return this._goldCoins;
  }
}
