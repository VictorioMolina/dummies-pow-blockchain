import PKG from "./package.json";
import Block from "./src/blockchain/Block";

const { name, version } = PKG;
console.log(`${name} v${version}`);

const { genesis } = Block;
console.log(genesis.toString());

const block1 = Block.mine(genesis, [0]);
console.log(block1.toString());

const block2 = Block.mine(block1, [0]);
console.log(block2.toString());
