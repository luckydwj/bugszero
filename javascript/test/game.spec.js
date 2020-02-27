const { Simulator } = require("../src/simulator");

const _ = require("lodash");

const { gameRunner } = require("../src/game-runner");
const expected = require("./expected");

describe("The game", function() {
  it("should work ;-)", function() {
    const loggedLines = [];
    const oldLog = console.log;
    console.log = function(arg) {
      loggedLines.push(arg);
    };

    _.range(15).forEach(() => {
      gameRunner(new Simulator());
    });

    console.log = oldLog;

    expect(loggedLines).toEqual(expected);
  });
});
