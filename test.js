const { GrizzlyInit } = require("./index.js");

const apiKey = "6f56715a92eda88fa96ca6a377a26a76";

const grizzly = new GrizzlyInit(apiKey);
// saveFilePath: "./prices.json",
const balance = grizzly.getLowestPrices({
    countryCode: "6",
    serviceCode: "ds",
    parseDelay: 100
});

console.log(balance)
