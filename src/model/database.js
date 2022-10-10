const utility = require('./utility')
const { DATABASE_PATH } = require('./constants')

/** Class that manages the database. */
class Database {
  constructor () {
    this.SEC_KEY = ''
    this.SEC_KEY_2 = ''
    this.ENC_MP = ''
  }

  /**
   * This method initializes the database for the first time. It creates the
   * JSON structure required for the database and stores it in a file.
   * @param {string} masterPassword Master Password of the database.
   **/
  init = async (masterPassword) => {
    try {
      await utility.readFile(DATABASE_PATH)
      const database = {}

      // Create the second part of the secret key.
      this.SEC_KEY_2 = utility.generateRandomKey(masterPassword.length)
      database.SEC_KEY_2 = this.SEC_KEY_2
      // The full secret key includes the master password.
      this.SEC_KEY = masterPassword + database.SEC_KEY_2
      // The master password is stored using a salted hash.
      const salt = utility.generateSalt()
      this.ENC_MP = utility.encryptMasterPassword(masterPassword, salt)
      // This is done to be able to extract the ENC_MP for validations.
      database.ENC_MP = this.ENC_MP
      // Array that contains the accounts.
      database[this.ENC_MP] = []

      await utility.writeFile(DATABASE_PATH, database)
    } catch (error) {
      console.log('Error at init (database.js).')
      console.log(error)
    }
  }

  /**
   * This method will make the database manageable. It will assign the
   * secret key, secondary part of the key, and encrypted master password
   * to the current instance of the class.
   * @param {string} masterPassword Master Password of the database.
   **/
  start = async (masterPassword) => {
    try {
      const database = await utility.readFile(DATABASE_PATH)

      this.SEC_KEY_2 = database.SEC_KEY_2
      this.SEC_KEY = masterPassword + this.SEC_KEY_2
      this.ENC_MP = database.ENC_MP
    } catch (error) {
      console.log('Error at start (database.js).')
      console.log(error)
    }
  }

  /**
   * This method will compare the password passed into it with the master
   * password that is currently in the database and return a boolean
   * value.
   * @param {string} masterPassword Master Password of the database.
   * @returns {Promise<boolean>} The result of the comparison of the hashes.
   **/
  verifyMasterPassword = async (masterPassword) => {
    // Get the keys from the database.
    try {
      const database = await utility.readFile(DATABASE_PATH)

      const [salt, hashedMP] = database.ENC_MP.split(':')

      // Get the hash of the inputted master password.
      const [, inputHash] = utility.encryptMasterPassword(masterPassword, salt)
        .split(':')

      return hashedMP === inputHash
    } catch (error) {
      console.log('Error at verifyMasterPassword (database.js).')
      console.log(error)
    }
  }

  /**
   * This method returns the number of accounts (size) of the database.
   * @returns {Promise<number>} Number Of Accounts in the database.
   **/
  getNumberOfAccounts = async () => {
    try {
      const database = await utility.readFile(DATABASE_PATH)

      return Object.keys(database).length
    } catch (error) {
      console.log('Error at getDatabaseLength (database.js).')
      console.log(error)
    }
  }

  /**
   * This method resets the master password. It takes in a new password,
   * changes the secret key and it re-encrypts all the accounts with the
   * new key. The new master password also gets re-encrypted with a new salt.
   * @param {string} newPassword New Master Password.
   **/
  resetMasterPassword = async (newPassword) => {
    try {
      const database = await utility.readFile(DATABASE_PATH)
      let accounts = [...database[this.ENC_MP]]

      // Delete the old master password key.
      delete database[this.ENC_MP]

      // Decrypt all the accounts.
      accounts = accounts.map(account => {
        const data = {}
        for (const item of Object.keys(account)) {
          data[item] = utility.decrypt(account[item], this.SEC_KEY)
        }
        return data
      })

      // Create a new secret key.
      this.SEC_KEY_2 = utility.generateRandomKey(newPassword.length)
      database.SEC_KEY_2 = this.SEC_KEY_2
      this.SEC_KEY = newPassword + database.SEC_KEY_2

      // Encrypt the new master password with a new salt.
      const salt = utility.generateSalt()
      this.ENC_MP = utility.encryptMasterPassword(newPassword, salt)
      database.ENC_MP = this.ENC_MP

      // Re-encrypt all the accounts.
      accounts = accounts.map(account => {
        const data = {}
        for (const item of Object.keys(account)) {
          data[item] = utility.encrypt(account[item], this.SEC_KEY)
        }
        return data
      })

      // Assign the accounts to the new key.
      database[this.ENC_MP] = accounts

      await utility.writeFile(DATABASE_PATH, database)
    } catch (error) {
      console.log('Error at resetMasterPassword (database.js).')
      console.log(error)
    }
  }

  /**
   * This method deletes all the accounts in the database, but it still
   * retains all the other keys.
   **/
  clearDatabase = async () => {
    try {
      const database = await utility.readFile(DATABASE_PATH)
      database[database.ENC_MP] = []

      await utility.writeFile(DATABASE_PATH, database)
    } catch (error) {
      console.log('Error at clearDatabase (database.js).')
      console.log(error)
    }
  }

  /**
   * This method creates a copy (backup) of the database in the specified path.
   * @param {string} backupPath Database Backup Path.
   **/
  createBackup = async (backupPath) => {
    try {
      const database = await utility.readFile(DATABASE_PATH)
      await utility.writeFile(backupPath, database)
    } catch (error) {
      console.log('Error at createBackup (database.js).')
      console.log(error)
    }
  }

  /**
   * This method checks the structure of the JSON file to see if it contains
   * a valid database scheme.
   * @param {string} backupPath Database Backup Path.
   * @returns {Promise<boolean>} Backup validation result.
   **/
  verifyBackup = async (backupPath) => {
    try {
      const backup = await utility.readFile(backupPath) ?? {}
      if (
        backup.hasOwnProperty('SEC_KEY_2') &&
        backup.hasOwnProperty('ENC_MP')
      ) {
        // Check if the ENC_MP key value and encrypted master password key are
        // the same If it does then the scheme is valid.
        return backup.hasOwnProperty(backup.ENC_MP)
      }
      return false
    } catch (error) {
      console.log('Error at verifyBackup (database.js).')
      console.log(error)
    }
  }

  /**
   * This method loads the backup database file from the path provided and
   * replaces the current database with it.
   * @param {string} backupPath Database Backup Path.
   **/
  loadBackup = async (backupPath) => {
    try {
      const database = await utility.readFile(backupPath)
      await utility.writeFile(DATABASE_PATH, database)
    } catch (error) {
      console.log('Error at loadBackup (database.js).')
      console.log(error)
    }
  }

  /**
   * This method creates and encrypts a new account in the database with the
   * data provided.
   * @param {object} account Account to create.
   **/
  createAccount = async (account) => {
    try {
      const encryptedAccount = {}
      const database = await utility.readFile(DATABASE_PATH)

      for (const item of Object.keys(account)) {
        encryptedAccount[item] = utility.encrypt(account[item], this.SEC_KEY)
      }

      database[this.ENC_MP].push(encryptedAccount)
      await utility.writeFile(DATABASE_PATH, database)
    } catch (error) {
      console.log('Error at createAccount (database.js).')
      console.log(error)
    }
  }

  /**
   * This method decrypts and returns all the accounts from the database.
   * @returns {Promise<Array>} List Of Accounts from the database.
   **/
  getAllAccounts = async () => {
    try {
      const database = await utility.readFile(DATABASE_PATH)
      let accounts = [...database[this.ENC_MP]]

      accounts = accounts.map(account => {
        const data = {}

        for (const item of Object.keys(account)) {
          data[item] = utility.decrypt(account[item], this.SEC_KEY)
        }

        return data
      })

      return accounts
    } catch (error) {
      console.log('Error at getAllAccounts (database.js).')
      console.log(error)
    }
  }

  /**
   * This method updates an already existing account in the database.
   * @param {number} index Index of the account to update.
   * @param {object} newAccount New Account details.
   **/
  updateAccount = async (index, newAccount) => {
    try {
      const encryptedAccount = {}
      let isNotTheSame
      const database = await utility.readFile(DATABASE_PATH)

      if (database[this.ENC_MP][index]) {
        // Encrypt the new account.
        for (const item of Object.keys(newAccount)) {
          encryptedAccount[item] = utility.encrypt(
            newAccount[item],
            this.SEC_KEY
          )
        }

        // Compare all the fields of the accounts to check if they are the same.
        const oldAccount = database[this.ENC_MP][index]

        for (const item of Object.keys(oldAccount)) {
          isNotTheSame = oldAccount[item] !== encryptedAccount[item]
        }

        if (isNotTheSame) {
          database[this.ENC_MP][index] = encryptedAccount
          await utility.writeFile(DATABASE_PATH, database)
        }
      }
    } catch (error) {
      console.log('Error at updateAccount (database.js).')
      console.log(error)
    }
  }

  /**
   *  This method deletes an account from the database from the provided index.
   *  @param {number} index Account index.
   **/
  deleteAccount = async (index) => {
    try {
      const database = await utility.readFile(DATABASE_PATH)

      if (database[this.ENC_MP][index]) {
        database[this.ENC_MP].splice(index, 1)
      }

      await utility.writeFile(DATABASE_PATH, database)
    } catch (error) {
      console.log('Error at deleteAccount (database.js).')
      console.log(error)
    }
  }
}

module.exports = Database
