import Elliptic from "elliptic";

import hash from "../modules/hash";

const INITIAL_BALANCE = 100;

// eslint-disable-next-line new-cap
const ec = new Elliptic.ec("secp256k1");

class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ec.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode("hex");
  }

  sign(data) {
    return this.keyPair.sign(hash(data));
  }

  toString() {
    const { balance, publicKey } = this;

    return `Wallet-
        publicKey       : ${publicKey.toString()},
        balance         : ${balance}
    `;
  }
}

export default Wallet;
export { INITIAL_BALANCE };
