const Database = require('../model/database')

class AccountController {
    constructor() {
        this.Model = new Database()
    }

    async checkIsNew() {
        try {
            const dbLength = await this.Model.getDatabaseLength()
            return dbLength === 0
        } catch (error) {
            console.log("Error at checkIsNew (Controller).")
            console.log(error)
        }
    }

    async createMasterPassword(masterPassword) {
        try {
            await this.Model.init(masterPassword)
            return true
        } catch (error) {
            console.log("Error at createMasterPassword (Controller).")
            console.log(error)
        }
    }

    async verifyMasterPassword(masterPassword) {
        try {
            const isMasterPassword = await this.Model.verifyMasterPassword(masterPassword)

            if (isMasterPassword) {
                await this.Model.start(masterPassword)
            }

            return isMasterPassword
        } catch (error) {
            console.log("Error at verifyMasterPassword (Controller).")
            console.log(error)
        }
    }

    async getAllAccounts() {
        try {
            return await this.Model.getAllAccounts()
        } catch (error) {
            console.log("Error at getAllAccounts (Controller).")
            console.log(error)
        }
    }

    async createAccount(account) {
        try {
            await this.Model.createAccount(account.username, account.password, account.website)
        } catch (error) {
            console.log("Error at createAccount (Controller).")
            console.log(error)
        }
    }

    async updateAccount(oldUsername, oldWebsite, newAccount) {
        try {
            await this.Model.updateAccount(oldUsername, oldWebsite, newAccount)
        } catch (error) {
            console.log("Error at updateAccount (Controller).")
            console.log(error)
        }
    }

    async deleteAccount(username, website) {
        try {
            await this.Model.deleteAccount(username, website)
        } catch (error) {
            console.log("Error at deleteAccount (Controller).")
            console.log(error)
        }
    }
}

module.exports = {
    AccountController
}
