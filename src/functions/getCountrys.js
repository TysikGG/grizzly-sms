const { readFileSync } = require("fs");

const codes = readFileSync("./src/data/countryCodes.txt", "utf-8");

function getCodesList() {
    const codesData = [];
    const splittedData = codes.split("\n");

    for (const data of splittedData) {
        const info = data.split(" — ");
        codesData.push(info[0])
    };
    return codesData;
};

module.exports = {
    getCodesList
}