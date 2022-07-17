const fs = require('fs')
const utility = require('./utility')
const path = require('path')
const {getAppDataPath} = require('appdata-path')
const {generateRandomKey} = require("./utility")

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

    // Reset the master password.
    async resetMasterPassword(newPassword) {
        try {
            await this.read()
            const {posts} = this.data

            // Get the accounts.
            let accounts = [...posts[this.ENC_MP]]

            // Delete the old master password key.
            delete posts[this.ENC_MP]

            // Decrypt all the accounts.
            accounts = accounts.map(account => {
                return {
                    website: utility.decrypt(account.website, this.SEC_KEY),
                    username: utility.decrypt(account.username, this.SEC_KEY),
                    password: utility.decrypt(account.password, this.SEC_KEY)
                }
            })

            // Generate a new random key.
            this.SEC_KEY_2 = generateRandomKey(newPassword.length)
            posts["SEC_KEY_2"] = this.SEC_KEY_2

            // Make a new secret key.
            this.SEC_KEY = newPassword + this.SEC_KEY_2

            // Generate a new encrypted master password.
            this.ENC_MP = utility.encrypt(newPassword, this.SEC_KEY)
            posts["ENC_MP"] = this.ENC_MP

            // Re-encrypt all the accounts.
            accounts = accounts.map(account => {
                return {
                    website: utility.encrypt(account.website, this.SEC_KEY),
                    username: utility.encrypt(account.username, this.SEC_KEY),
                    password: utility.encrypt(account.password, this.SEC_KEY)
                }
            })

            // Assign the accounts to the new key.
            posts[this.ENC_MP] = accounts

            // Write to the database.
            await this.write()

        } catch (error) {
            console.log("Error at resetMasterPassword (Database).")
            console.log(error)
        }
    }

    // Clear the database (Deletes all the accounts).
    async clearDatabase() {
        try {
            await this.read()
            const {posts} = this.data

            // Delete all the accounts.
            const MASTER_KEY = posts["ENC_MP"]
            posts[MASTER_KEY] = []

            await this.write()
        } catch (error) {
            console.log("Error at clearDatabase (Database).")
            console.log(error)
        }
    }

    // Create database backup.
    async createBackup(backupPath) {
        try {
            // Make a copy of the database.
            await this.read()
            const databaseCopy = JSON.stringify(this.data)

            // Make a copy of the database in the specified path.
            await fs.promises.writeFile(backupPath, databaseCopy, "utf-8")
        } catch (error) {
            console.log("Error at createBackup (Database).")
            console.log(error)
        }
    }

    // Verify database backup.
    async verifyBackup(backupPath) {
        try {
            // Read the backup file (Or use an empty object).
            const backup = JSON.parse(await fs.promises.readFile(backupPath, 'utf-8') || "{}")

            // Check if the database has, and only has a posts key.
            if (Object.keys(backup).length === 1 && backup.hasOwnProperty("posts")) {
                // Check if the database has a SEC_KEY_2 and an ENC_MP key.
                const {posts} = backup
                if (posts.hasOwnProperty("SEC_KEY_2") && posts.hasOwnProperty("ENC_MP")) {
                    // Check if the ENC_MP key value and encrypted master password key are the same.
                    const ENC_MP = posts["ENC_MP"]
                    // If it does then the scheme is valid, and it returns true.
                    return posts.hasOwnProperty(ENC_MP)
                }
            }

            // Otherwise, the scheme is invalid.
            return false
        } catch (error) {
            console.log("Error at verifyBackup (Database).")
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