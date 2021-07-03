import Blockchain from "../Blockchain";
import Block from "../Block";

describe("Blockchain", () => {
  let blockchain1;
  let blockchain2;

  beforeEach(() => {
    blockchain1 = new Blockchain();
    blockchain2 = new Blockchain();
  });

  it("Every blockchain has a genesis block", () => {
    const [genesisBlock] = blockchain1.blocks;

    expect(genesisBlock).toEqual(Block.genesis);
    expect(blockchain1.blocks.length).toEqual(1);
  });

  it("Use of method addBlock()", () => {
    const data = "test-data";
    blockchain1.addBlock(data);
    const [, lastBlock] = blockchain1.blocks;

    expect(lastBlock.data).toEqual(data);
    expect(blockchain1.blocks.length).toEqual(2);
  });

  it("Replace the chain with a valid one", () => {
    blockchain2.addBlock("test-data");
    blockchain1.replace(blockchain2.blocks);

    expect(blockchain1.blocks).toEqual(blockchain2.blocks);
  });

  it("Do not replace the chain with a shorter one", () => {
    blockchain1.addBlock("test-data");

    expect(() => {
      blockchain1.replace(blockchain2.blocks);
    }).toThrowError("The new chain is not longer than current one.");
  });

  it("Do not replace the chain with an invalid chain", () => {
    blockchain2.addBlock("test-data");
    blockchain2.blocks[1].data = "hacked-block";

    expect(() => {
      blockchain1.replace(blockchain2.blocks);
    }).toThrowError("Received chain is invalid");
  });
});
