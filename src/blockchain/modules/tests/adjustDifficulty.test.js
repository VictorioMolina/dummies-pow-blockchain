import adjustDifficulty from "../adjustDifficulty";
import { DIFFICULTY } from "../../block";

describe("adjustDifficulty", () => {
  let previousBlock;

  beforeEach(() => {
    previousBlock = { timestamp: Date.now(), difficulty: DIFFICULTY };
  });

  it("Decrease difficulty for slowly mined blocks", () => {
    const { timestamp } = previousBlock;

    expect(adjustDifficulty(previousBlock, timestamp + 60000)).toBeLessThan(
      DIFFICULTY
    );
  });

  it("Increase difficulty for quickly mined blocks", () => {
    const { timestamp } = previousBlock;

    expect(adjustDifficulty(previousBlock, timestamp + 1000)).toBeGreaterThan(
      DIFFICULTY
    );
  });
});
