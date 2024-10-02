const { GrizzlyInit } = require("./index.js");

const apiKey = "6f56715a92eda88fa96ca6a377a26a76";

const grizzly = new GrizzlyInit(apiKey);

const balance = grizzly.getBalance();

console.log(balance)

