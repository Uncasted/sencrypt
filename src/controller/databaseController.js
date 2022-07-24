const Database = require("../model/database")
const { ipcRenderer } = require("electron")

class DatabaseController {
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
      const isMasterPassword = await this.Model.verifyMasterPassword(
        masterPassword
      )

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

  async resetMasterPassword(newPassword) {
    try {
      await this.Model.resetMasterPassword(newPassword)
    } catch (error) {
      console.log("Error at resetMasterPassword (Controller).")
      console.log(error)
    }
  }

  async clearDatabase() {
    try {
      await this.Model.clearDatabase()
    } catch (error) {
      console.log("Error at resetMasterPassword (Controller).")
      console.log(error)
    }
  }

  async createBackup() {
    try {
      // Send a request to main process to get the path for the backup.
      const backupPath = await ipcRenderer.invoke("backup:create")
      // If the path is not empty.
      if (backupPath) {
        // Create the database backup.
        await this.Model.createBackup(backupPath)
      }
    } catch (error) {
      console.log("Error at loadBackup (Controller).")
      console.log(error)
    }
  }

  async loadBackup() {
    try {
      // Send a request to the main process to get the path for the backup.
      const backupPath = await ipcRenderer.invoke("backup:load")
      // If the path is not empty.
      if (backupPath) {
        // Verify the database scheme.
        const isVerified = await this.Model.verifyBackup(backupPath)
        if (isVerified) {
          // Load the backup.
          await this.Model.loadBackup(backupPath)
        }
      }
    } catch (error) {
      console.log("Error at createBackup (Controller).")
      console.log(error)
    }
  }

  async createAccount(account) {
    try {
      await this.Model.createAccount(
        account.username,
        account.password,
        account.website
      )
    } catch (error) {
      console.log("Error at createAccount (Controller).")
      console.log(error)
    }
  }

  async updateAccount(index, newAccount) {
    try {
      await this.Model.updateAccount(index, newAccount)
    } catch (error) {
      console.log("Error at updateAccount (Controller).")
      console.log(error)
    }
  }

  async deleteAccount(index) {
    try {
      await this.Model.deleteAccount(index)
    } catch (error) {
      console.log("Error at deleteAccount (Controller).")
      console.log(error)
    }
  }
}

module.exports = DatabaseController
