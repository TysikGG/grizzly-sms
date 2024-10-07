const { writeFileSync } = require("fs");
const { getCodesList } = require("../functions/getCountrys");
const { APIRequest } = require("../functions/request");
const { errorHandler, getError } = require("../functions/errorHandler");

class GrizzlyInit {
    constructor (apiKey) {
        this.apiKey = apiKey;
        this.numbers = {}
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

        const formattedData = data[countryCode][serviceCode];
        return formattedData;
    };

    async getLowestPrices({serviceCode, saveFilePath, parseDelay, retryErrors, minCount, maxPrice}) {
        const infoList = [];
        let sortedInfoList = [];
        const countryCodes = getCodesList();

        async function getInfo(code, obj) {
            const data = await obj.getInfo({
                serviceCode: serviceCode,
                countryCode: code
            });
            if ((!data || !data?.cost) && retryErrors) return getInfo(code);
            else if (data && data?.cost) {
                if (data.count < (minCount || 0)) return;
                if (data.cost > maxPrice) return;
                data.code = code;
                infoList.push(data);
                return data;
            };
        };

        async function delayedIterations(codes, delay, obj) {
            for (const code of codes) {
                await getInfo(code, obj);
                await new Promise(resolve => setTimeout(resolve, delay));
            };
        };
        
        await delayedIterations(countryCodes, parseDelay || 200, this);

        sortedInfoList = infoList.sort((a, b) => a?.cost - b?.cost);
        console.log(sortedInfoList)
        if (saveFilePath) writeFileSync(saveFilePath, JSON.stringify(sortedInfoList, null, 2))
    };

    async getNumber({serviceCode, countryCode, maxPrice}) {
        if (maxPrice) {
            const info = await this.getInfo({
                serviceCode: serviceCode,
                countryCode: countryCode
            });
            if (info?.cost > maxPrice) return;
        };

        const data = await APIRequest("getNumber", {
            api_key: this.apiKey,
            service: serviceCode,
            country: countryCode
        });
        console.log(data)
        const splittedData = data.split(":");

        if (!splittedData[1]) return errorHandler(data);
        this.numbers[splittedData[2]] = {
            id: splittedData[1],
            activatedTime: Date.now()
        };
        console.log(this.numbers);
        return {
            number: splittedData[2],
            id: splittedData[1]
        };
    };

    async getStatus({id, number}) {
        let formedID;
        if (!id) formedID = this.numbers[number];
        else formedID = id;
        if (!formedID) return errorHandler("NO_ACTIVATION");

        const data = await APIRequest("getStatus", {
            api_key: this.apiKey,
            id: formedID
        });
        
        const splitted = data.split(":");

        if (splitted[1]) {
            return {
                status: splitted[0],
                code: splitted[1]
            };
        } else {
            if (getError(data)) return errorHandler(data);
            else return {status: data};
        };
    };

    async setStatus({id, number, status}) {
        let formedID;
        if (!id) formedID = this.numbers[number];
        else formedID = id;
        if (!formedID) return errorHandler("NO_ACTIVATION");

        const data = await APIRequest("setStatus", {
            api_key: this.apiKey,
            id: formedID,
            status: status
        });

        if (getError(data)) return errorHandler(data);
        else return {status: data};  
    };
};

module.exports = {
    GrizzlyInit
};