export interface Validator {
    address: string
    stake: number
}

class ValidatorPool {
    private validators: Validator[] = []

    addValidator(address: string, stake: number) {
        this.validators.push({ address, stake })
    }

    chooseValidator(): string {
        const totalStake = this.validators.reduce((sum, validator) => sum + validator.stake, 0)
        let randomStake = Number((Math.random() * totalStake).toFixed(5))

        for (const v of this.validators) {
            randomStake -= v.stake
            if (randomStake <= 0) return v.address
        }
        return this.validators[0].address
    }
}

export default ValidatorPool