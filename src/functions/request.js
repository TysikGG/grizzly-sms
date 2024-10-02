const axios = require("axios");
const domain = "https://api.7grizzlysms.com/stubs/handler_api.php?";

async function APIRequest(action, params) {
    const paramsKeys = Object.keys(params);
    const paramsValues = Object.values(params);

    let urlData = "";

    for (const i in Object.keys(params)) {
        urlData += `${paramsKeys[i]}=${paramsValues[i]}&`
    };
    urlData += `action=${action}`;

    const req = await axios.get(domain + urlData);
    
    if (req.data) {
        const balance = req.data.split(":")[1]
        console.log(Number(balance))
        return Number(balance)
    } else {
        return null
    }
}

module.exports = {
    APIRequest
}