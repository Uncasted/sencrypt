const fs = require('fs')
const utility = require('./utility')
const path = require('path')
const {getAppDataPath} = require('appdata-path')

class Database {
    constructor() {
        this.jsonPath = path.join(getAppDataPath("sencrypt"), './database.json')
        this.data = {posts: {}}
        this.SEC_KEY = ""
        this.SEC_KEY_2 = ""
        this.ENC_MP = ""
    }

    // Initialize the database for the first time.
    async init(masterPassword) {
        try {
            await this.read()
            const {posts} = this.data

            // Generate random Key (SEC_KEY_2)
            this.SEC_KEY_2 = utility.generateRandomKey(masterPassword.length)
            posts["SEC_KEY_2"] = this.SEC_KEY_2
            // Secret key
            this.SEC_KEY = masterPassword + posts["SEC_KEY_2"]
            // Generate Encrypted Master Password (ENC_MP)
            this.ENC_MP = utility.encrypt(masterPassword, this.SEC_KEY)
            // This is done to extract the ENC_MP easily.
            posts["ENC_MP"] = this.ENC_MP
            // This will handle the objects that contain the accounts.
            posts[this.ENC_MP] = []

            await this.write()
        } catch (error) {
            console.log("Error at init (Database).")
            console.log(error)
        }
    }

    // Start the database.
    async start(masterPassword) {
        try {
            await this.read()
            const {posts} = this.data

            this.SEC_KEY_2 = posts["SEC_KEY_2"]
            this.SEC_KEY = masterPassword + this.SEC_KEY_2
            this.ENC_MP = posts["ENC_MP"]

        } catch (error) {
            console.log("Error at start (Database).")
            console.log(error)
        }
    }

    async verifyMasterPassword(masterPassword) {
        // Get the keys from the database.
        try {
            await this.read()
            const {posts} = this.data

            const userKey = masterPassword + posts["SEC_KEY_2"]

            // If the userKey length is not correct, then we can assume that the password is incorrect.
            // The reason we do this is to prevent an error from invalid key length.
            if (userKey.length === 49) {
                const encryptedUserMP = utility.encrypt(masterPassword, userKey)

                // Compare encrypted input to encrypted master password.
                return encryptedUserMP === posts["ENC_MP"]
            } else {
                return false
            }

        } catch (error) {
            console.log("Error at verifyMasterPassword (Database).")
            console.log(error)
        }
    }

    async read() {
        try {
            if (fs.existsSync(this.jsonPath)) {
                const dataString = await fs.promises.readFile(this.jsonPath, 'utf-8')
                this.data = JSON.parse(dataString)
            } else {
                const initialData = JSON.stringify({posts: {}})
                // Create the database file.
                await fs.promises.writeFile(this.jsonPath, initialData, 'utf-8')

                const dataString = await fs.promises.readFile(this.jsonPath, 'utf-8')
                this.data = JSON.parse(dataString)
            }
        } catch (error) {
            console.log("Error at read function (Database).")
            console.log(error)
        }
    }

    async write() {
        try {
            const dataToWrite = JSON.stringify(this.data)
            await fs.promises.writeFile(this.jsonPath, dataToWrite)
        } catch (error) {
            console.log("Error at write function (Database).")
            console.log(error)
        }
    }

// Get the length of the posts object.
    async getDatabaseLength() {
        try {
            await this.read()
            const {posts} = this.data

            return Object.keys(posts).length
        } catch (error) {
            console.log("Error at getDatabaseLength (Database).")
            console.log(error)
        }
    }


// Basic CRUD Operations.
    async createAccount(username, password, website) {
        try {
            await this.read()
            const {posts} = this.data

            // Encrypt the data
            const encryptedAccount = {
                website: utility.encrypt(website, this.SEC_KEY),
                username: utility.encrypt(username, this.SEC_KEY),
                password: utility.encrypt(password, this.SEC_KEY)
            }

            // Pushing the account into the database.
            posts[this.ENC_MP].push(encryptedAccount)
            await this.write()
        } catch (error) {
            console.log("Error at createAccount (Database).")
            console.log(error)
        }
    }

// Get all the accounts.
    async getAllAccounts() {
        try {
            await this.read()
            const {posts} = this.data

            let accounts = [...posts[this.ENC_MP]]

            // Decrypt the data
            accounts = accounts.map((account) => {
                // Decrypt the data
                return {
                    website: utility.decrypt(account.website, this.SEC_KEY),
                    username: utility.decrypt(account.username, this.SEC_KEY),
                    password: utility.decrypt(account.password, this.SEC_KEY)
                }
            })

            return accounts
        } catch (error) {
            console.log("Error at getAllAccounts (Database).")
            console.log(error)
        }
    }

    async updateAccount(index, newAccount) {
        try {
            await this.read()
            const {posts} = this.data

            // Encrypt the account.
            newAccount = {
                website: utility.encrypt(newAccount.website, this.SEC_KEY),
                username: utility.encrypt(newAccount.username, this.SEC_KEY),
                password: utility.encrypt(newAccount.password, this.SEC_KEY)
            }

            // Compare all the fields of the accounts to check if they are not the same.
            const oldAccount = posts[this.ENC_MP][index]

            const isNotTheSame = oldAccount.username !== newAccount.username || oldAccount.website !==
                newAccount.website || oldAccount.password !== newAccount.password

            // If the account is not the same, then we can continue.
            // If we don't do this check and the account is the same, it will get deleted.

            if (isNotTheSame) {
                // Update the account.
                posts[this.ENC_MP][index] = newAccount
                await this.write()
            }
        } catch (error) {
            console.log("Error at updateAccount (Database).")
            console.log(error)
        }
    }

    async deleteAccount(index) {
        try {
            await this.read()
            const {posts} = this.data

            // Delete the account at the specified index.
            posts[this.ENC_MP].splice(index, 1)

            await this.write()
        } catch (error) {
            console.log("Error at deleteAccount (Database).")
            console.log(error)
        }
    }

}

module.exports = Database