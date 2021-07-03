import _hash from "../modules/hash";
import adjustDifficulty from "./modules/adjustDifficulty";

const DIFFICULTY = 3;

class Block {
  constructor(
    timestamp,
    data,
    previousHash = undefined,
    hash,
    nonce = 0,
    difficulty = DIFFICULTY
  ) {
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = hash;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static get genesis() {
    const timestamp = new Date(1970, 0, 1).getTime();
    return new this(timestamp, [], undefined, "genesis");
  }

  static mine(previousBlock, data) {
    const { hash: previousHash } = previousBlock;
    let timestamp;
    let hash;
    let nonce = 0;
    let { difficulty } = previousBlock;

    do {
      timestamp = Date.now();
      nonce += 1;
      difficulty = adjustDifficulty(previousBlock, timestamp);
      hash = this.hash(timestamp, data, previousHash, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));

    return new this(timestamp, data, previousHash, hash, nonce, difficulty);
  }

  static hash(timestamp, data, previousHash, nonce, difficulty) {
    return _hash(`${timestamp}${data}${previousHash}${nonce}${difficulty}`);
  }

  toString() {
    const { timestamp, data, previousHash, hash, nonce, difficulty } = this;

    return `Block -
        timestamp       : ${timestamp}
        data            : ${data}
        previousHash    : ${previousHash}
        hash            : ${hash}
        nonce           : ${nonce}
        difficulty      : ${difficulty}
    `;
  }
}

export default Block;
export { DIFFICULTY };
