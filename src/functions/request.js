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

    try {
        const req = await axios.get(domain + urlData);
        return req.data
    } catch (e) {
        console.log(e.message)
        return {error: true, message: e.message};
    }
}

module.exports = {
    APIRequest
}