const { quiryAll } = require('./data-access/utils/db');
require('dotenv').config();

let doTest = async () => {
    try {
        let list = await quiryAll('bill.type', 99);

        console.log(list);
        console.log("111111111111111111111111111111");

    } catch (err) {

    }
};

doTest();