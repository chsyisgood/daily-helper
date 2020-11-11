var aesjs = require('aes-js');

let str = 'asdasbb12313cxzc213]]]ads';

let encrypt = aesjs.utils.utf8.toBytes(str);

console.log(encrypt);

console.log(typeof encrypt);

console.log(aesjs.utils.utf8.fromBytes(encrypt));


console.log(aesjs.utils.utf8.fromBytes( [97, 115, 100, 97,
    115,  98,  98, 97,
    100, 115] ));
