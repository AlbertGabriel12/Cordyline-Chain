"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}
exports.default = Transaction;
