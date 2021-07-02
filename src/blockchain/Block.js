import { SHA256 } from "crypto-js";

class Block {
  constructor(timestamp, previousHash = undefined, hash, data) {
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = hash;
    this.data = data;
  }

  static get genesis() {
    const timestamp = new Date(1970, 0, 1).getTime();
    return new this(timestamp, undefined, "genesis", []);
  }

  static mine(previousBlock, data) {
    const timestamp = Date.now();
    const { hash: previousHash } = previousBlock;
    const hash = this.hash(timestamp, previousBlock, data);

    return new this(timestamp, previousHash, hash, data);
  }

  static hash(timestamp, previousHash, data) {
    return SHA256(`${timestamp}${previousHash}${data}`).toString();
  }

  toString() {
    const { timestamp, previousHash, hash, data } = this;

    return `Block -
        timestamp       : ${timestamp}
        data            : ${data}
        hash            : ${hash}
        previousHash    : ${previousHash}
    `;
  }
}

export default Block;
