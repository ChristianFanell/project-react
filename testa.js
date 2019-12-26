
// let obj = [
//     { p_price: 777, p_amount: 777, com_name: "Silver" },

//     { p_price: 500, p_amount: 21, com_name: "Silver" },

//     { p_price: 92.42776409879978, p_amount: 16, com_name: "Gold" },

//     { p_price: 9130.487761822511, p_amount: 99, com_name: "Gold" },

//     { p_price: 217, p_amount: 10, com_name: "Silver" },

//     { p_price: 22, p_amount: 1, com_name: "Silver" }

// ]

// let sum = obj.map((item, i)=> item.p_price).reduce((acc, curr) => {
//     return acc + curr
// } )

// console.log(sum)


var myMetals = [
    { c_sum: 109, com_name: "Gold" },
    { c_sum: 23, com_name: "Silver" },
    { c_sum: 33, com_name: "Bronze" }
    ]
    
    let amount = myMetals.filter((keyzz )=> {
        if ('Gold' === keyzz.com_name) {
            return keyzz.c_sum;
        }
    })[0].c_sum

    console.log(amount)