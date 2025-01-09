import Blockchain from "./blockchain";
import Transaction from "./transaction";
import ValidatorPool from "./validator-pool";
import Wallet from "./wallet";

const cordylineChain = new Blockchain()
const w1 = new Wallet()
const w2 = new Wallet()

cordylineChain.validatorPool.addValidator("1", 20)
cordylineChain.validatorPool.addValidator("2", 10)
cordylineChain.validatorPool.addValidator("3", 30)

const tx = w1.createTransaction(w2.publicKey, 3)
cordylineChain.addTransactionToPendingTransaction(tx)
cordylineChain.minePendingTransactions()

console.log(JSON.stringify(cordylineChain, null, 2))




// Simulação
// const results: { [validator: string]: number } = {
//     "1": 0,
//     "2": 0,
//     "3": 0,
//     "4": 0,
//     "5": 0,
//     "6": 0,
//     "7": 0,
//     "8": 0,
//     "9": 0,
//     "10": 0
// };
// const iterations = 100;

// for (let a = 0; a < iterations; a++) {
//     const v = new ValidatorPool();
//     v.addValidator("1", 10.03022);
//     v.addValidator("2", 10.32223);
//     v.addValidator("3", 30.32223);
//     v.addValidator("4", 40.00000);
//     v.addValidator("5", 40.00000);
//     v.addValidator("6", 40.00000);
//     v.addValidator("7", 40.00000);
//     v.addValidator("8", 40.00000);
//     v.addValidator("9", 40.00000);
//     v.addValidator("10", 400.00000);

//     const selected = v.chooseValidator();
//     results[selected]++;
// }

// // Calculando a porcentagem de vezes que cada validador foi selecionado
// const percentages: { [validator: string]: number } = {};
// for (const validator in results) {
//     percentages[validator] = (results[validator] / iterations) * 100;
// }

// console.log("Percentagens de seleção:", percentages);
//-------------------------------------------------------------------------



// cordylineChain.createTransaction({
//     from: "a",
//     to: "b",
//     ammount: 3
// })
// cordylineChain.createTransaction({
//     from: "b",
//     to: "a",
//     ammount: 3
// })

// cordylineChain.minePendingTransactions("abc")

// console.log(JSON.stringify(cordylineChain, null, 2))