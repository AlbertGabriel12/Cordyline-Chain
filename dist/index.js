"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Blockchain_1 = __importDefault(require("./Blockchain"));
const p2p_1 = require("./p2p");
require("./server");
const myCoin = new Blockchain_1.default();
const p2pServer = new p2p_1.P2PServer(myCoin);
p2pServer.listen();
// Broadcast do bloco minerado para os outros nós
p2pServer.broadcastBlock(myCoin.getLatestBlock());
