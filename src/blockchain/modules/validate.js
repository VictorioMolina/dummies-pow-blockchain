import Block from "../Block";

export default (blockchain) => {
  const [genesisBlock, ...blocks] = blockchain;

  if (JSON.stringify(genesisBlock) !== JSON.stringify(Block.genesis)) {
    throw Error("Invalid genesis block.");
  }

  blocks.forEach(
    ({ timestamp, data, previousHash, hash, nonce, difficulty }, index) => {
      const previousBlock = blockchain[index];

      if (previousHash !== previousBlock.hash) {
        throw Error("Invalid previous hash.");
      }

      if (
        hash !== Block.hash(timestamp, data, previousHash, nonce, difficulty)
      ) {
        throw Error("Invalid hash.");
      }
    }
  );

  return true;
};
