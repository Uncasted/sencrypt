// Utility functions.

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

module.exports.randomChars = randomChars;