const Database = require('../model/database')
const { ipcRenderer } = require('electron')

/** Controller for the database.*/
class DatabaseController {
  constructor () {
    this.Model = new Database()
  }

  /**
   * Controller wrapper for loading the database using the master password.
   * @see {Database.start} for more information.
   * @param {string} masterPassword Master password.
   **/
  start = async (masterPassword) => {
    await this.Model.start(masterPassword)
  }

  /**
   * Controller wrapper to verify the master password passed by the user
   * with the one in the database.
   * @see {Database.verifyMasterPassword} for more information.
   * @param {string} masterPassword Master password.
   * @returns {Promise<boolean>} Is Master Password?
   **/
  verifyMasterPassword = async (masterPassword) => {
    return await this.Model.verifyMasterPassword(masterPassword)
  }

  /**
   * This method obtains the database backup path via the handleFileSave
   * method from the filepath library in the main process. The path is then
   * returned to the method through IPC.
   *
   * It tries to create the backup and then returns a boolean value that
   * depends on whether the backup was created successfully.
   * @see {handleFileSave} for more information about saving a file.
   * @see {Database.createBackup} for more information about creating a backup.
   * @returns {Promise<boolean>} Backup was created?
   **/
  createBackup = async () => {
    try {
      const backupPath = await ipcRenderer.invoke('backup:create')
      // If the path is not empty.
      if (backupPath) {
        await this.Model.createBackup(backupPath)
        // Backup successful.
        return true
      }
      // Backup failed.
      return false
    } catch (error) {
      console.log('Error at loadBackup (Controller).')
      console.log(error)
    }
  }

  /**
   * This method obtains the database backup path in a very similar way as
   * the wrapper for the createBackup, through handleFileOpen and returned
   * to this method through IPC.
   *
   * It verifies the backup through verifyBackup, and if the scheme is valid
   * then it loads the backup.
   * @see {handleFileOpen} to see more information about opening a file.
   * @see {Database.verifyBackup} To see more information about backup
   * verification.
   * @see {Database.loadBackup} To see more information about loading a backup.
   * @returns {Promise<boolean>} Backup was loaded?
   **/
  loadBackup = async () => {
    try {
      let isVerified
      const backupPath = await ipcRenderer.invoke('backup:load')
      // If the path is not empty.
      if (backupPath) {
        isVerified = await this.Model.verifyBackup(backupPath)
        if (isVerified) {
          await this.Model.loadBackup(backupPath)
        }
      }
      // Return boolean value for the notification.
      return isVerified
    } catch (error) {
      console.log('Error at createBackup (Controller).')
      console.log(error)
    }
  }

  /**
   * This method checks the amount of keys in the database to determine
   * if a user is new. This can be done because when the database is first
   * created, it has no keys.
   * @see {Database.numberOfKeys} for more information.
   * @returns {Promise<boolean>} Is the user new?
   **/
  checkIsNew = async () => {
    const dbLength = await this.Model.numberOfKeys()
    return dbLength === 0
  }

  /**
   * Controller wrapper for initializing the database with a master password.
   * @see {Database.init} for more information.
   * @param {string} masterPassword Master Password.
   * @returns {Promise<boolean>} Database initialized.
   **/
  createMasterPassword = async (masterPassword) => {
    await this.Model.init(masterPassword)
    return true
  }

  /**
   * Controller wrapper for getting all the accounts from the database.
   * @see {Database.getAllAccounts} for more information.
   * @returns {Promise<Account[]>} List of accounts.
   **/
  getAllAccounts = async () => {
    return await this.Model.getAllAccounts()
  }

  /**
   * Controller wrapper for resetting the master password.
   * @see {Database.resetMasterPassword} for more information.
   * @param {string} newPassword New Master Password.
   **/
  resetMasterPassword = async (newPassword) => {
    await this.Model.resetMasterPassword(newPassword)
  }

  /**
   * Controller wrapper for deleting all the accounts in the database.
   * @see {Database.clearDatabase} for more information.
   **/
  clearDatabase = async () => {
    await this.Model.clearDatabase()
  }

  /**
   * Controller wrapper for creating a new account.
   * @see {Database.createAccount} for more information.
   * @param {Account} account New account.
   **/
  createAccount = async (account) => {
    await this.Model.createAccount(account)
  }

  /**
   * Controller wrapper for updating the data in an existing account.
   * @see {Database.updateAccount} for more information.
   * @param {number} index Account Index.
   * @param {Account} newAccount Account with updated values.
   **/
  updateAccount = async (index, newAccount) => {
    await this.Model.updateAccount(index, newAccount)
  }

  /**
   * Controller wrapper for deleting an account from the database.
   * @see {Database.deleteAccount} for more information.
   * @param {number} index Account Index.
   **/
  deleteAccount = async (index) => {
    await this.Model.deleteAccount(index)
  }
}

module.exports = DatabaseController
