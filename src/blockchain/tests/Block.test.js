import Block from "../block";

describe("Block", () => {
  let timestamp;
  let previousBlock;
  let data;
  let hash;
  let nonce;

  beforeEach(() => {
    timestamp = new Date(1970, 0, 1);
    previousBlock = Block.genesis;
    data = "test-data";
    hash = "test-hash";
    nonce = 1024;
  });

  it("Create an instance with parameters", () => {
    const block = new Block(timestamp, data, previousBlock.hash, hash, nonce);

    expect(block.timestamp).toEqual(timestamp);
    expect(block.data).toEqual(data);
    expect(block.previousHash).toEqual(previousBlock.hash);
    expect(block.hash).toEqual(hash);
    expect(block.nonce).toEqual(nonce);
  });

  it("Use of static method mine()", () => {
    const block = Block.mine(previousBlock, data);
    const { difficulty } = block;

    expect(block.hash.length).toEqual(64);
    expect(block.hash.substring(0, difficulty)).toEqual("0".repeat(difficulty));
    expect(block.previousHash).toEqual(previousBlock.hash);
    expect(block.nonce).toBeGreaterThan(0);
    expect(block.data).toEqual(data);
  });

  it("Use of static method hash()", () => {
    hash = Block.hash(timestamp, data, previousBlock.hash, nonce);
    const expectedHash =
      "aa5b72930f19b499cb56bb34e3f8c9d9039f9f73e5f996fa6e2fa4f849e18c1b";

    expect(hash).toEqual(expectedHash);
  });

  it("Use of method toString()", () => {
    const block = Block.mine(previousBlock, data);

    console.log(block.toString());

    expect(typeof block.toString()).toEqual("string");
  });
});
