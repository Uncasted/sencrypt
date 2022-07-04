const Database = require('../model/database')

class AccountController {
    constructor() {
        this.Model = new Database('./testing.json')
    }

    async checkIsNew(masterPassword) {
        const dbLength = await this.Model.getDatabaseLength()
        const isNew = dbLength === 0

        if (isNew) {
            console.log("New user. Initializing the database.")
            await this.Model.init(masterPassword)
        } else {
            const isMasterPassword = await this.Model.verifyMasterPassword(masterPassword)

            if (isMasterPassword) {
                await this.Model.start(masterPassword)
            }

            return isMasterPassword
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
