function errorHandler(errorData) {
    return {
        error: true, 
        status: errorData
    };
};

function getError(errorData) {
    switch (errorData) {
        case "NO_ACTIVATION":
            return true;
        case "BAD_KEY":
            return true;
        case "BAD_ACTION":
            return true;
        case "NO_NUMBERS":
            return true;
        case "ERROR_SQL":
            return true;
        case "BAD_SERVICE":
            return true;
        case "BAD_STATUS":
            return true;
        default:
            return false;
    };
};

module.exports = {
    errorHandler,
    getError
};