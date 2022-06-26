const encryption = require('../model/encryption');
const crud = require('../model/crud');

class AccountController {
    constructor(SK, encryptedMP) {
        this.SK = SK;
        this.encryptedMP = encryptedMP;
    }

    async getUsernames() {
        try {
            const encryptedUsernames = await crud.getUsernames(this.encryptedMP);
            const decryptedUsernames = [];
            for (const username of encryptedUsernames) {
                const decryptedUsername = encryption.decrypt(username, this.SK);
                decryptedUsernames.push(decryptedUsername);
            }

            return decryptedUsernames;
        } catch (error) {
            console.log("Error at getUsernames (Controller).");
            console.log(error);
        }
    }

    async createAccount(username, password) {
        try {
            // Encrypt the account data.
            const encryptedUsername = encryption.encrypt(username, this.SK);
            const encryptedPassword = encryption.encrypt(password, this.SK);

            // Insert it into the database.
            await crud.createAccount(this.encryptedMP, encryptedUsername, encryptedPassword);
        } catch (error) {
            console.log("Error at createAccount (Controller).");
            console.log(error);
        }
    }

    async getPassword(username) {
        try {
            const encryptedUsername = encryption.encrypt(username, this.SK);
            const encryptedPassword = await crud.getPassword(this.encryptedMP, encryptedUsername);

            // Decrypt the account password.
            const decryptedPassword = encryption.decrypt(encryptedPassword, this.SK);
            return decryptedPassword;
        } catch (error) {
            console.log("Error at getAccount (Controller).");
            console.log(error);
        }
    }

    async updateUsername(oldUsername, newUsername) {
        try {
            const encryptedOldUsername = encryption.encrypt(oldUsername, this.SK);
            const encryptedNewUsername = encryption.encrypt(newUsername, this.SK);

            await crud.updateUsername(this.encryptedMP, encryptedOldUsername, encryptedNewUsername);
        } catch (error) {
            console.log("Error at updateUsername (Controller).");
            console.log(error);
        }
    }

    async updatePassword(username, newPassword) {
        try {
            const encryptedUsername = encryption.encrypt(username, this.SK);
            const encryptedNewPassword = encryption.encrypt(newPassword, this.SK);

            await crud.updatePassword(this.encryptedMP, encryptedUsername, encryptedNewPassword);
        } catch (error) {
            console.log("Error at updatePassword (Controller).");
            console.log(error);
        }
    }

    async deleteAccount(username) {
        try {
            const encryptedUsername = encryption.encrypt(username, this.SK);
            await crud.deleteAccount(this.encryptedMP, encryptedUsername);
        } catch (error) {
            console.log("Error at deleteAccount (Controller).");
            console.log(error);
        }
    }
}

module.exports = {
    AccountController
};