// Preload (Isolated World)
const DatabaseController = require("./databaseController")
const SettingsController = require("./settingsController")
const { contextBridge } = require("electron")
const utility = require("../model/utility")

const database = new DatabaseController()
const settings = new SettingsController()

// Database Controller.
contextBridge.exposeInMainWorld("database", {
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
    await database.createBackup()
  },
  loadBackup: async () => {
    await database.loadBackup()
  },
  createAccount: async account => {
    await database.createAccount(account)
  },
  updateAccount: async (index, newAccount) => {
    await database.updateAccount(index, newAccount)
  },
  deleteAccount: async index => {
    await database.deleteAccount(index)
  },
})

// Settings controller.
contextBridge.exposeInMainWorld("settings", {
  getSettings: async () => await settings.getSettings(),
  init: async () => {
    await settings.init()
  },
  start: async () => {
    await settings.start()
  },
  updateSetting: async (option, value) => {
    await settings.updateSetting(option, value)
  },
})

// Utility functions.
contextBridge.exposeInMainWorld("utility", {
  generateRandomPassword: (parameters, length) =>
    utility.generateRandomPassword(parameters, length),
})
