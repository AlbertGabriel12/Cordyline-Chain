"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = __importDefault(require("crypto-js"));
class Block {
    constructor(timestamp, transactions, previousHash = '', validator) {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.generateHash();
        this.validator = validator;
    }
    generateHash() {
        return crypto_js_1.default.SHA256(this.previousHash + JSON.stringify(this.transactions) + this.timestamp + this.validator).toString();
    }
}
exports.default = Block;
