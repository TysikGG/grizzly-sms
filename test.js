const { GrizzlyInit } = require("./index.js");

const apiKey = "";

const grizzly = new GrizzlyInit(apiKey);
// saveFilePath: "./prices.json",

const balance = grizzly.getLowestPrices({
    saveFilePath: "./prices.json",
    countryCode: "6",
    serviceCode: "ds",
    parseDelay: 200,
    minCount: 100,
    maxPrice: 3
});

console.log(balance)


const number = grizzly.getNumber({
    countryCode: require("./prices.json")[0].code,
    serviceCode: "ds"
})

