import Blockchain from "../../blockchain";
import validate from "../validate";

describe("validate()", () => {
  let blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
  });

  it("Validate a valid blockchain", () => {
    blockchain.addBlock("block1");
    blockchain.addBlock("block2");

    expect(validate(blockchain.blocks)).toBe(true);
  });

  it("Invalidate a blockchain with a corrupt genesis block", () => {
    blockchain.blocks[0].date = "modified-date";

    expect(() => {
      validate(blockchain.blocks);
    }).toThrowError("Invalid genesis block.");
  });

  it("Invalidate a blockchain with an invalid previousHash within a block", () => {
    blockchain.addBlock("block1");
    blockchain.blocks[1].previousHash = "modified-previousHash";

    expect(() => {
      validate(blockchain.blocks);
    }).toThrowError("Invalid previous hash.");
  });

  it("Invalidate a blockchain with an invalid hash within a block", () => {
    blockchain.addBlock("block1");
    blockchain.blocks[1].hash = "modified-hash";

    expect(() => {
      validate(blockchain.blocks);
    }).toThrowError("Invalid hash.");
  });
});
