const crud = require('../model/crud');
const authModel = require('../model/auth');

async function createMasterPassword(masterPassword) {
    try {
        await crud.databaseInit(masterPassword);
    } catch (error) {
        console.log("Error at createMasterPassword");
        console.log(error);
    }
}

async function validatePassword(masterPassword) {
    try {
        return await authModel.authMP(masterPassword);
    } catch (error) {
        console.log("Error at validatePassword.");
        console.log(error);
    }
}

async function isNewUser() {
    try {
        const databaseLength = await crud.getDatabaseLength();
        // If the database doesn't have any keys then it's a new user.
        return databaseLength === 0;
    } catch (error) {
        console.log("Error at isNewUser.");
        console.log(error);
    }
}

module.exports.createMasterPassword = createMasterPassword;
module.exports.isNewUser = isNewUser;
module.exports.validatePassword = validatePassword;