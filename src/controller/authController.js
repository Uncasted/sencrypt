const crud = require('../model/crud');
const authModel = require('../model/authModel');

// Initializing the database with the new Password.
async function createMasterPassword(masterPassword) {
    try {
        await crud.databaseInit(masterPassword);
    } catch (error) {
        console.log("Error at createMasterPassword");
        console.log(error);
    }
}

// Validate input password against the master password in the database.
async function validatePassword(masterPassword) {
    try {
        return await authModel.verifyMasterPassword(masterPassword);
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

module.exports = {
    createMasterPassword,
    isNewUser,
    validatePassword
};