const fs = require('fs')
const utility = require('./utility')
const path = require('path')

class Database {
    constructor(filepath) {
        this.jsonPath = path.join(__dirname, filepath)
        this.data = {posts: {}}
        this.SEC_KEY = ""
        this.SEC_KEY_2 = ""
        this.ENC_MP = ""
    }

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
            // This will handle the object that contains the usernames and passwords.
            posts[this.ENC_MP] = {}

            await this.write()
        } catch (error) {
            console.log("Error at init (Database).")
            console.log(error)
        }
    }

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
                return false;
            }

        } catch (error) {
            console.log("Error at verifyMasterPassword (Database).")
            console.log(error)
        }
    }

    async read() {
        try {
            const dataString = await fs.promises.readFile(this.jsonPath, 'utf-8')
            this.data = JSON.parse(dataString)
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
            const encryptedUsername = utility.encrypt(username, this.SEC_KEY)
            const encryptedPassword = utility.encrypt(password, this.SEC_KEY)
            const encryptedWebsite = utility.encrypt(website, this.SEC_KEY)

            // key : value | username-website : password
            posts[this.ENC_MP][`${encryptedUsername}-${encryptedWebsite}`] = encryptedPassword
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

            const myAccounts = {...posts[this.ENC_MP]}

            // Decrypt the data
            Object.keys(myAccounts).map((account) => {
                // Separate the username and the website.
                const username = account.substring(0, account.indexOf("-"))
                const website = account.substring(account.indexOf("-") + 1)

                // Decrypt the data
                const decryptedUsername = utility.decrypt(username, this.SEC_KEY)
                const decryptedWebsite = utility.decrypt(website, this.SEC_KEY)
                myAccounts[`${decryptedUsername}-${decryptedWebsite}`] = utility.decrypt(myAccounts[account],
                    this.SEC_KEY)

                // Get rid of the encrypted key/value.
                delete myAccounts[account]
            })

            return myAccounts
        } catch (error) {
            console.log("Error at getAllAccounts (Database).")
            console.log(error)
        }
    }

    async updateAccount(oldUsername, oldWebsite, newAccount) {
        try {
            await this.read()
            const {posts} = this.data

            // Encrypt the data.
            const encryptedOldUsername = utility.encrypt(oldUsername, this.SEC_KEY)
            const encryptedOldWebsite = utility.encrypt(oldWebsite, this.SEC_KEY)

            Object.keys(newAccount).map((element) => {
                newAccount[element] = utility.encrypt(newAccount[element], this.SEC_KEY)
            })

            // Give the password to the new username.
            posts[this.ENC_MP][`${newAccount.username}-${newAccount.website}`] = newAccount.password
            delete posts[this.ENC_MP][`${encryptedOldUsername}-${encryptedOldWebsite}`]

            await this.write()
        } catch (error) {
            console.log("Error at updateAccount (Database).")
            console.log(error)
        }
    }

    async deleteAccount(username, website) {
        try {
            await this.read()
            const {posts} = this.data

            // Encrypt the data.
            const encryptedUsername = utility.encrypt(username, this.SEC_KEY)
            const encryptedWebsite = utility.encrypt(website, this.SEC_KEY)
            delete posts[this.ENC_MP][`${encryptedUsername}-${encryptedWebsite}`]

            await this.write()
        } catch (error) {
            console.log("Error at deleteAccount (Database).")
            console.log(error)
        }
    }

}

module.exports = Database