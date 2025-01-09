import Block from "./block";
import { randomUUID } from "crypto"
import Transaction from "./transaction";
import ValidatorPool from "./validator-pool";

class Blockchain {
    chain: Block[] = []
    private pendingTransactions: Transaction[] = []
    public validatorPool: ValidatorPool
    private reward: number = 100

    constructor() {
        this.validatorPool = new ValidatorPool()
        this.createGenesisBlock()
    }

    private createGenesisBlock(): void {
        this.chain.push(new Block(0, "", "Genesis", null))
    }

    public addTransactionToPendingTransaction(transaction: Transaction): void {
        this.pendingTransactions.push(transaction);
    }

    public minePendingTransactions(): void {
        const validadorAddress = this.validatorPool.chooseValidator()

        const coinbaseTransaction = {
            id: randomUUID(),
            to: "Coinbase",
            from: validadorAddress,
            ammount: this.reward,
            signature: null
        }

        const latestBlock = this.getLatestBlock()
        const block = new Block(this.chain.length, latestBlock.hash, [...this.pendingTransactions, coinbaseTransaction], validadorAddress)

        this.chain.push(block)
        this.pendingTransactions = []
    }

    public getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }
}

export default Blockchain