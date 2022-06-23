const crypto = require('crypto');
const utility = require('./utility');

function genRandomKey(length) {
    if (length === 32) {
        // If the length is already 32 just return the IV.
        return  utility.randomChars(16);
    }
    // Second part of the key needs to make the secret key 32 bytes long.
    const SK2 = utility.randomChars(32 - length);
    // Initialization vector
    const IV = utility.randomChars(16);
    return SK2 + IV;
}

function encrypt(text, secretKey) {
    // The last 16 chars are the Initialization vector.
    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey.slice(0, 32), secretKey.slice(32));
    let encryptedText = cipher.update(text, 'utf-8', 'base64');
    encryptedText += cipher.final('base64');
    return encryptedText;
}

module.exports.genRandomKey = genRandomKey;
module.exports.encrypt = encrypt;