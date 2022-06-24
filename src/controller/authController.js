const crud = require('../model/crud');

async function createMasterPassword(masterPassword) {
    try {
        await crud.databaseInit(masterPassword);
    } catch (error) {
        console.log("Error at createMasterPassword");
        console.log(error);
    }
}

module.exports.createMasterPassword = createMasterPassword;