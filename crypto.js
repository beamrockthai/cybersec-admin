const crypto = require("crypto-js");

const mypassword = 'mypass';
const mykey = 'key';


// encode
const encode = crypto.AES.encrypt(mypassword,mykey);
console.log("TEST",encode.toString());

const Dcode = crypto.AES.decrypt(encode.toString(),mykey);
console.log("TESTDECOND",Dcode.toString(crypto.enc.Utf8));


