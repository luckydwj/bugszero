/**
 *  Created by daiwenjuan on 2020/2/26 16:42.
 */
export class Player {
  private readonly playerName: string;
  private _goldCoins: number = 0;
  private _place: number = 0;
  private _isPenaltyBox: boolean = false;
  constructor(name) {
    this.playerName = name;
    console.log(`${name} was added`);
  }

  get name() {
    return this.playerName;
  }

  addValue() {
    this._goldCoins += 1;
    console.log(`${this.playerName} now has ${this._goldCoins} Gold Coins.`);
  }

  updatePlace(roll) {
    this._place = this._place + roll;
    if (this._place > 11) {
      this._place = this._place - 12;
    }
    console.log(`${this.playerName}'s new location is ${this._place}`);
  }

  freedFromPenaltyBox() {
    console.log(`${this.playerName} is getting out of the penalty box`);
  }

  updatePensltyBox(flag) {
    this._isPenaltyBox = flag;
  }

  get isPenaltyBox(): boolean {
    return this._isPenaltyBox;
  }

  get place(): number {
    return this._place;
  }

  get goldCoins(): number {
    return this._goldCoins;
  }
}
