"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidatorPool {
    constructor() {
        this.validators = [];
    }
    addValidator(address, stake) {
        this.validators.push({ address, stake });
    }
    chooseValidator() {
        const totalStake = this.validators.reduce((sum, validator) => sum + validator.stake, 0);
        const random = Math.floor(Math.random() * totalStake);
        let cumulative = 0;
        for (const validator of this.validators) {
            cumulative += validator.stake;
            if (random < cumulative) {
                return validator.address;
            }
        }
        return '';
    }
}
exports.default = ValidatorPool;
