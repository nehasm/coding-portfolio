function computeAmount() {
    let amount = 0;
    let api = {
        lacs: (value) => {
            amount += value * 100000;
            return api;
        },
        crore: function (value) {
            amount += value * 10000000;
            return api;
        },
        thousand: function (value) {
            amount += + value * 1000;
            return api;
        },
        value: function() {
            return amount;
        }
    }
    return api
}


let total = computeAmount()
    .lacs(10)
    .crore(5)
    .lacs(2)
    .crore(3)
    .thousand(4)
    .crore(1)
    .value();

console.log(`Total Amount: ${total}`);
