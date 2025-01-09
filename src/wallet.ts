import * as bip39 from "bip39"
import * as EC from "elliptic";
import Transaction from "./transaction"

const ec = new EC.ec("secp256k1");

class Wallet {
    publicKey!: string
    private privateKey!: string
    mnemonic: string

    constructor() {
        this.mnemonic = this.generateMnemonic()
        this.generateKeyPairFromMnemonic(this.mnemonic)
    }

    generateMnemonic(): string {
        return bip39.generateMnemonic()
    }

    generateKeyPairFromMnemonic(mnemonic: string) {
        const seed = bip39.mnemonicToSeedSync(mnemonic).toString("hex").slice(0, 64)
        const keyPair = ec.keyFromPrivate(seed)
        this.privateKey = keyPair.getPrivate("hex")
        this.publicKey = keyPair.getPublic("hex")
    }

    createTransaction(to: string, ammount: number): Transaction {
        const tx = new Transaction(this.publicKey, to, ammount)
        tx.signTransaction(this.privateKey)
        return tx
    }
}

export default Wallet