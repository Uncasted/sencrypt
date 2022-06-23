const crud = require('./crud');
const crypto = require('./crypto');

async function authMP(masterPassword) {
    // Get the keys from the database.
    try {
        const encryptedSK1 = await crud.getKeyValue("SK1");
        const SK2 = await crud.getKeyValue("SK2");

        const userKey = masterPassword + SK2;
        const encryptedMP = crypto.encrypt(masterPassword, userKey);

        // Compare encrypted input to encrypted master password.
        return encryptedMP === encryptedSK1;
    } catch (error) {
        console.log("Error at authMP.");
        console.log(error);
    }
}

module.exports.authMP = authMP;

