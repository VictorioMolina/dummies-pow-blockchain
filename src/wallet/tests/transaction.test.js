/* eslint-disable new-cap */
import Transaction from "../transaction";
import Wallet from "../wallet";

describe("Transaction", () => {
  let wallet;
  let recipientAddress;
  let amount;
  let transaction;

  beforeEach(() => {
    wallet = new Wallet();
    recipientAddress = "test-recipient-address";
    amount = 5;
    transaction = new Transaction.create(wallet, recipientAddress, amount);
  });

  it("Outputs the 'amount' substracted from the wallet balance", () => {
    const output = transaction.outputs.find(
      ({ address }) => address === wallet.publicKey
    );

    expect(output.amount).toEqual(wallet.balance - amount);
  });

  it("Outputs the 'amount' added to the recipient", () => {
    const output = transaction.outputs.find(
      ({ address }) => address === recipientAddress
    );

    expect(output.amount).toEqual(amount);
  });

  describe("Transacting with an amount that exceeds the balance", () => {
    beforeEach(() => {
      amount = 500;
      transaction = undefined;
    });

    it("Do not create the transaction", () => {
      expect(() => {
        transaction = new Transaction.create(wallet, recipientAddress, amount);
      }).toThrowError("Amount 500 exceeds the balance");
    });
  });
});
