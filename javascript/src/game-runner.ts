import { Game } from "./game";

export function gameRunner(simulator) {
  // a simulator of a game



  const game = new Game();

  game.add("Chet");
  game.add("Pat");
  game.add("Sue");

  game.start(simulator);
}
