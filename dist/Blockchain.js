"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Block_1 = __importDefault(require("./Block"));
const Transaction_1 = __importDefault(require("./Transaction"));
const ValidatorPool_1 = __importDefault(require("./ValidatorPool"));
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.pendingTransactions = [];
        this.validatorPool = new ValidatorPool_1.default();
        this.reward = 100;
    }
    createGenesisBlock() {
        return new Block_1.default(Date.now(), [], '0', 'Genesis');
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }
    addValidator(address, stake) {
        this.validatorPool.addValidator(address, stake);
    }
    minePendingTransactions(minerAddress) {
        const validator = this.validatorPool.chooseValidator();
        const block = new Block_1.default(Date.now(), this.pendingTransactions, this.getLatestBlock().hash, validator);
        this.chain.push(block);
        this.pendingTransactions = [new Transaction_1.default(null, validator, this.reward)];
    }
    getBalanceOfAddress(address) {
        let balance = 0;
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }
                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.generateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}
exports.default = Blockchain;
