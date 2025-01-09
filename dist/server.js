"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const Blockchain_1 = __importDefault(require("./Blockchain"));
const Transaction_1 = __importDefault(require("./Transaction"));
const p2p_1 = require("./p2p");
const app = (0, express_1.default)();
const port = process.env.HTTP_PORT || 3333;
const myCoin = new Blockchain_1.default();
const p2pServer = new p2p_1.P2PServer(myCoin);
app.use(body_parser_1.default.json());
app.get('/blocks', (req, res) => {
    res.json(myCoin.chain);
});
app.post('/transactions', (req, res) => {
    const { fromAddress, toAddress, amount } = req.body;
    const transaction = new Transaction_1.default(fromAddress, toAddress, amount);
    myCoin.createTransaction(transaction);
    p2pServer.sendTransaction(transaction);
    res.json({ message: 'Transaction created and broadcasted successfully.' });
});
app.post('/mine', (req, res) => {
    const { minerAddress } = req.body;
    myCoin.minePendingTransactions(minerAddress);
    const newBlock = myCoin.getLatestBlock();
    p2pServer.broadcastBlock(newBlock);
    res.json({
        message: 'New block mined and broadcasted successfully.',
        block: newBlock,
    });
});
app.get('/balance/:address', (req, res) => {
    const { address } = req.params;
    const balance = myCoin.getBalanceOfAddress(address);
    res.json({ address, balance });
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
p2pServer.listen();
