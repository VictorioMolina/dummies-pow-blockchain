import Block from "../Block";

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
    const block = new Block(timestamp, data, previousBlock.hash, hash);

    expect(block.timestamp).toEqual(timestamp);
    expect(block.data).toEqual(data);
    expect(block.previousHash).toEqual(previousBlock.hash);
    expect(block.hash).toEqual(hash);
  });

  it("Use of static method mine()", () => {
    const block = Block.mine(previousBlock, data);

    expect(block.hash.length).toEqual(64);
    expect(block.previousHash).toEqual(previousBlock.hash);
    expect(block.data).toEqual(data);
  });

  it("Use of static method hash()", () => {
    hash = Block.hash(timestamp, data, previousBlock.hash);
    const expectedHash =
      "5dd0100a7b1b8bca8ac43cefff461d9ae7ab096a3e31273774395c931ebb19d6";

    expect(hash).toEqual(expectedHash);
  });

  it("Use of method toString()", () => {
    const block = Block.mine(previousBlock, data);

    expect(typeof block.toString()).toEqual("string");
  });
});
