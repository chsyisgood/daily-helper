const { findAllByDisplayValue } = require("@testing-library/react");

class ServiceResult {
    constructor(success = true, data) {
        if(!success) {
            this.data = {};
            this.success = success;
            this.errMsg = data;
        }

        this.data = data;
        this.success = success;
        this.errMsg = '';
    };
}

module.exports = {
    ServiceResult
};
