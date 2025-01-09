import { randomUUID } from "crypto"
import * as CryptoJS from "crypto-js"
import * as EC from "elliptic"
const ec = new EC.ec('secp256k1');

class Transaction {
    public id: string = randomUUID()
    public from: string
    public to: string
    public ammount: number
    public signature: EC.ec.Signature | null = null

    constructor(from: string, to: string, ammount: number) {
        this.from = from
        this.to = to
        this.ammount = ammount
    }

    calculateHash(): string {
        return CryptoJS.SHA256(this.id + this.from + this.to + this.ammount).toString()
    }

    signTransaction(privateKey: string): void {
        const signingKey = ec.keyFromPrivate(privateKey)

        if (signingKey.getPublic("hex") !== this.from) {
            throw new Error('Cannot sign transactions for other wallets!');
        }

        this.signature = signingKey.sign(this.calculateHash())
    }

    isValid(): boolean {
        if (!this.signature) {
            throw new Error('No signature in this transaction')
        }

        const publicKey = ec.keyFromPublic(this.from, "hex")
        return publicKey.verify(this.calculateHash(), this.signature)
    }
}

export default Transaction