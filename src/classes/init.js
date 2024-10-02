const { writeFileSync } = require("fs");
const { getCodesList } = require("../functions/getCountrys");
const { APIRequest } = require("../functions/request");

class GrizzlyInit {
    constructor (apiKey) {
        this.apiKey = apiKey;
    }

    async getBalance() {
        const data = await APIRequest("getBalance", {
            api_key: this.apiKey
        });
        const balance = data.split(":")[1];
        return balance;
    }

    async getInfo({serviceCode, countryCode}) {
        const data = await APIRequest("getPrices", {
            api_key: this.apiKey,
            service: serviceCode,
            country: countryCode
        });
        if (!data[countryCode]) return null;
        if (data.error) return data;

        console.log(data)
        const formattedData = data[countryCode][serviceCode];
        console.log(formattedData)

        return formattedData;
    };

    async getLowestPrices({serviceCode, saveFilePath, parseDelay, retryErrors}) {
        const infoList = [];
        let sortedInfoList = [];
        const countryCodes = getCodesList();

        async function getInfo(code, obj) {
            const data = await obj.getInfo({
                serviceCode: serviceCode,
                countryCode: code
            });
            if ((!data || !data.cost) && retryErrors) return getInfo(code);
            infoList.push(data)
            return data;
        };

        async function delayedIterations(codes, delay, obj) {
            for (const code of codes) {
                await getInfo(code, obj);
                await new Promise(resolve => setTimeout(resolve, delay));
            };
        };
        
        await delayedIterations(countryCodes, parseDelay || 200, this);

        sortedInfoList = infoList.sort((a, b) => a.cost - b.cost);
        console.log(sortedInfoList)
        if (saveFilePath) writeFileSync(saveFilePath, JSON.stringify(sortedInfoList, null, 2))
    };
};

module.exports = {
    GrizzlyInit
};