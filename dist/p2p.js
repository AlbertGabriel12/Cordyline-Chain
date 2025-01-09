"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.P2PServer = void 0;
const ws_1 = __importDefault(require("ws"));
const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];
class P2PServer {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.sockets = [];
    }
    listen() {
        const server = new ws_1.default.Server({ port: Number(P2P_PORT) });
        server.on('connection', (socket) => this.connectSocket(socket));
        this.connectToPeers();
        console.log(`Listening for P2P connections on port: ${P2P_PORT}`);
    }
    connectToPeers() {
        peers.forEach((peer) => {
            const socket = new ws_1.default(peer);
            socket.on('open', () => this.connectSocket(socket));
        });
    }
    connectSocket(socket) {
        this.sockets.push(socket);
        console.log('Socket connected');
        this.messageHandler(socket);
        // Enviar a blockchain local quando uma nova conexão é estabelecida
        this.sendChain(socket);
    }
    messageHandler(socket) {
        socket.on('message', (message) => {
            const data = JSON.parse(message.toString());
            switch (data.type) {
                case 'CHAIN':
                    this.handleBlockchainResponse(data.chain);
                    break;
                case 'TRANSACTION':
                    this.blockchain.createTransaction(data.transaction);
                    break;
                case 'BLOCK':
                    this.handleNewBlock(data.block);
                    break;
            }
        });
    }
    sendChain(socket) {
        socket.send(JSON.stringify({
            type: 'CHAIN',
            chain: this.blockchain.chain
        }));
    }
    sendTransaction(transaction) {
        this.sockets.forEach(socket => socket.send(JSON.stringify({
            type: 'TRANSACTION',
            transaction
        })));
    }
    broadcastBlock(block) {
        this.sockets.forEach(socket => socket.send(JSON.stringify({
            type: 'BLOCK',
            block
        })));
    }
    handleBlockchainResponse(receivedChain) {
        if (receivedChain.length > this.blockchain.chain.length) {
            this.blockchain.chain = receivedChain;
            console.log('Received blockchain is longer, replacing current chain.');
        }
        else {
            console.log('Received blockchain is shorter or equal to current chain. No replacement needed.');
        }
    }
    handleNewBlock(receivedBlock) {
        const latestBlock = this.blockchain.getLatestBlock();
        if (receivedBlock.previousHash === latestBlock.hash && this.blockchain.isChainValid()) {
            this.blockchain.chain.push(receivedBlock);
            this.blockchain.pendingTransactions = []; // Limpa transações pendentes
            console.log('New block accepted and added to the chain');
        }
        else {
            console.log('Received block is invalid or doesn’t fit the current chain');
            this.broadcastBlock(latestBlock); // Envia a versão atual da blockchain
        }
    }
}
exports.P2PServer = P2PServer;
