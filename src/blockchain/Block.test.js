import Block from "./Block";

describe("Block", () => {
  let timestamp;
  let previousBlock;
  let data;
  let hash;

  beforeEach(() => {
    timestamp = new Date(1970, 0, 1);
    previousBlock = Block.genesis;
    data = "test-data";
    hash = "test-hash";
  });

  it("Create an instance with parameters", () => {
    const block = new Block(timestamp, previousBlock.hash, hash, data);

    expect(block.timestamp).toEqual(timestamp);
    expect(block.previousHash).toEqual(previousBlock.hash);
    expect(block.data).toEqual(data);
    expect(block.hash).toEqual(hash);
  });

  it("Use of static method mine()", () => {
    const block = Block.mine(previousBlock, data);

    expect(block.hash.length).toEqual(64);
    expect(block.previousHash).toEqual(previousBlock.hash);
    expect(block.data).toEqual(data);
  });

  it("Use of static method hash()", () => {
    hash = Block.hash(timestamp, previousBlock.hash, data);
    const expectedHash =
      "b878a92691af5bf417870d17e46c9876dcf5fc2161dba768ba1140b6dc8d81f6";

    expect(hash).toEqual(expectedHash);
  });

  it("Use of method toString()", () => {
    const block = Block.mine(previousBlock, data);

    expect(typeof block.toString()).toEqual("string");
  });
});
