const { GrizzlyInit } = require("./index.js");

const apiKey = "6efe3831c1abfeb968ddeb6c4c909bd1";
const grizzly = new GrizzlyInit(apiKey);
// saveFilePath: "./prices.json",

/* const balance = grizzly.getLowestPrices({
    saveFilePath: "./prices.json",
    countryCode: "6",
    serviceCode: "ds",
    parseDelay: 200,
    minCount: 100,
    maxPrice: 3
});

console.log(balance) */


const number = grizzly.getNumber({
    countryCode: require("./prices.json")[2].code,
    serviceCode: "ds"
}).then((data) => {
    console.log(data);
    grizzly.getStatus({
        id: data.id
    }).then((res) => {
        console.log(res)
    })
})

