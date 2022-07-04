// Preload (Isolated World)
const {contextBridge, ipcRenderer} = require('electron')
const {AccountController} = require("./accountController")

const Controller = new AccountController()

contextBridge.exposeInMainWorld('controller',
    {
        verifyMasterPassword: async (input) => await Controller.checkIsNew(input),
        getAllAccounts: async () => await Controller.getAllAccounts(),
        createAccount: async (account) => {
            await Controller.createAccount(account)
        },
        updateAccount: async (oldUsername, oldWebsite, newAccount) => {
            await Controller.updateAccount(oldUsername, oldWebsite, newAccount)
        },
        deleteAccount: async (username, website) => {
            await Controller.deleteAccount(username, website)
        }
    }
)

