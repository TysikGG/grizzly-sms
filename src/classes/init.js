const { APIRequest } = require("../functions/request");

class GrizzlyInit {
    constructor (apiKey) {
        this.apiKey = apiKey;
    }

    async getBalance() {
        const data = await APIRequest("getBalance", {
            api_key: this.apiKey
        })
        return data
    }
}

module.exports = {
    GrizzlyInit
}