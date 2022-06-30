// Utility functions.
const crypto = require('crypto');

// Generate random chars.
function randomChars(length) {
    const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let chars = "";

    for (let i = 0; i < length; i++) {
        // Take random char from alphabet.
        chars += alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    return chars;
}

function generateRandomKey(length) {
    if (length === 32) {
        // If the length is already 32 just return the INIT_VEC.
        return randomChars(16);
    }
    // Second part of the key needs to make the secret key 32 bytes long.
    const SEC_KEY_2 = randomChars(32 - length);
    // Initialization vector
    const INIT_VEC = randomChars(16);
    return SEC_KEY_2 + "-" + INIT_VEC;
}

function encrypt(text, SEC_KEY) {
    // The last 16 chars are the Initialization vector.
    const cipher = crypto.createCipheriv('aes-256-cbc', SEC_KEY.substring(0, SEC_KEY.indexOf("-")),
        SEC_KEY.substring(SEC_KEY.indexOf("-") + 1));
    let encryptedText = cipher.update(text, 'utf-8', 'base64');
    encryptedText += cipher.final('base64');
    return encryptedText;
}

function decrypt(encryptedText, SEC_KEY) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', SEC_KEY.substring(0, SEC_KEY.indexOf("-")),
        SEC_KEY.substring(SEC_KEY.indexOf("-") + 1));
    let decryptedText = decipher.update(encryptedText, 'base64', 'utf8');
    decryptedText += decipher.final('utf8');
    return decryptedText;
}

module.exports = {
    generateRandomKey,
    encrypt,
    decrypt
};