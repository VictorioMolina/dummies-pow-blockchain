import { SHA256 } from "crypto-js";

class Block {
  constructor(timestamp, data, previousHash = undefined, hash) {
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = hash;
  }

  static get genesis() {
    const timestamp = new Date(1970, 0, 1).getTime();
    return new this(timestamp, [], undefined, "genesis");
  }

  static mine(previousBlock, data) {
    const timestamp = Date.now();
    const { hash: previousHash } = previousBlock;
    const hash = this.hash(timestamp, data, previousHash);

    return new this(timestamp, data, previousHash, hash);
  }

  static hash(timestamp, data, previousHash) {
    return SHA256(`${timestamp}${data}${previousHash}`).toString();
  }

  toString() {
    const { timestamp, data, previousHash, hash } = this;

    return `Block -
        timestamp       : ${timestamp}
        data            : ${data}
        previousHash    : ${previousHash}
        hash            : ${hash}
    `;
  }
}

export default Block;
