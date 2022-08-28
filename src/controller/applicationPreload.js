// Preload (Main Application)
const DatabaseController = require('./databaseController')
const SettingsController = require('./settingsController')
const { contextBridge, ipcRenderer } = require('electron')
const utility = require('../model/utility')

const database = new DatabaseController()
const settings = new SettingsController()

// Database Controller.
contextBridge.exposeInMainWorld('database', {
  checkIsNew: async () => await database.checkIsNew(),
  createMasterPassword: async masterPassword =>
    await database.createMasterPassword(masterPassword),
  verifyMasterPassword: async masterPassword =>
    await database.verifyMasterPassword(masterPassword),
  getAllAccounts: async () => await database.getAllAccounts(),
  resetMasterPassword: async newPassword => {
    await database.resetMasterPassword(newPassword)
  },
  clearDatabase: async () => {
    await database.clearDatabase()
  },
  createBackup: async () => {
    return await database.createBackup()
  },
  loadBackup: async () => {
    return await database.loadBackup()
  },
  createAccount: async account => {
    await database.createAccount(account)
  },
  updateAccount: async (index, newAccount) => {
    await database.updateAccount(index, newAccount)
  },
  deleteAccount: async index => {
    await database.deleteAccount(index)
  }
})

// Settings controller.
contextBridge.exposeInMainWorld('settings', {
  getSettings: async () => await settings.getSettings(),
  updateSetting: async (option, value) => {
    await settings.updateSetting(option, value)
  },
  toggleTray: (isEnabled) => {
    ipcRenderer.send('toggle:tray', isEnabled)
  },
  toggleStartup: (isEnabled) => {
    ipcRenderer.send('toggle:startup', isEnabled)
  }
})

// Utility functions.
contextBridge.exposeInMainWorld('utility', {
  generateRandomPassword: (parameters, length) =>
    utility.generateRandomPassword(parameters, length),
  getPlatform: () => {
    return process.platform
  },
  openURL: (URL) => {
    ipcRenderer.send('open:url', URL)
  }
})

// Main Window process.
contextBridge.exposeInMainWorld('mainWin', {
  minimize: () => {
    ipcRenderer.send('mainWin:minimize')
  },
  maximize: () => {
    ipcRenderer.send('mainWin:maximize')
  },
  closeWindow: () => {
    ipcRenderer.send('mainWin:close')
  }
})

// Tray menu event listeners.
ipcRenderer.on('view:section', (event, section) => {
  // Click on the section.
  const button = document.getElementById(`${section}-section`)
  // If the section is loaded, it means the user is logged in.
  if (button) {
    button.click()
  }
})
