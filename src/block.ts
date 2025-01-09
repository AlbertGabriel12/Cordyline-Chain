import CryptoJS from "crypto-js"

class Block {
    index: number
    previousHash: string
    timestamp: Date
    data: any
    hash: string
    validator: string | null

    constructor(index: number, previousHash: string, data: any, validator: string | null) {
        this.index = index
        this.previousHash = previousHash
        this.timestamp = new Date()
        this.data = data
        this.validator = validator
        this.hash = this.calculateHash()
    }

    calculateHash(): string {
        return CryptoJS.SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString()
    }
}

export default Block