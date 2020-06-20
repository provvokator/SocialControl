const cryptoKey = require('../config/cryptoKey');
const CryptoJS = require("crypto-js");
class Crypt {
    constructor(cryptographer,key) {
        this.cryptographer = cryptographer;
        this.key = key;
    }


    encrypt(text){
        return this.cryptographer.AES.encrypt(text,this.key).toString()
    }

    decrypt(text){
        return this.cryptographer.AES.decrypt(text,this.key).toString(this.cryptographer.enc.Utf8);
    }

}

const cryptographer = new Crypt(CryptoJS,cryptoKey);

module.exports = cryptographer;