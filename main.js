const {app, BrowserWindow, dialog, ipcMain} = require('electron')
const path = require('path')
const SettingsController = require('./src/controller/settingsController')


// Check if the file explorer is opened.
let dialogIsOpen = false
// Time to wait for re-login.
const reloadTime = getReloadTime() || 0
// Main Window.
let mainWin
// Create the main window.
const createMainWindow = async () => {
    // Change the icon path depending on the platform.
    const iconPath = process.platform !== "darwin" ? "./build/icon.png" : "./build/icon.icns"

    mainWin = new BrowserWindow({
        width: 1280,
        height: 720,
        minWidth: 900,
        minHeight: 600,
        autoHideMenuBar: true,
        icon: path.join(__dirname, iconPath),
        webPreferences: {
            preload: path.join(__dirname, "./src/controller/preload.js")
        }
    })
    await mainWin.loadFile(path.join(__dirname, "./src/view/dist/index.html"))
}

// Starting the app.
app.whenReady().then(() => {
    createMainWindow().then()

    // Open a window if none are open.
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow().then()
    })
})

// Quit the app when we close all windows. (Except on macOS)
app.on('window-all-closed', () => {
    if (process.platform !== "darwin") app.quit()
})

// Timeout for re-login.
app.on("browser-window-blur", () => {
    // If the main window is not focused and reload time is bigger than 0.
    if (!mainWin.isFocused() && reloadTime && !dialogIsOpen) {
        // Start the timeout.
        checkForReload().then()
    }
})

// Get the path to create the backup.
ipcMain.handle("backup:create", async () => {
    dialogIsOpen = true
    // Options for creating a backup.
    const options = {
        title: "Create A Database Backup:",
        buttonLabel: "Create Backup",
        defaultPath: "databaseBackup.json",
        filters: [
            {name: "Database File (JSON)", extensions: ["json"]}
        ]
    }
    // Getting the path.
    return await handleFileSave(mainWin, options)
})

// Get the path to load the backup.
ipcMain.handle("backup:load", async () => {
    dialogIsOpen = true
    // Options for loading a backup.
    const options = {
        title: "Load A Database Backup:",
        buttonLabel: "Load Backup",
        properties: ["openFile"],
        filters: [
            {name: "Database File (JSON)", extensions: ["json"]}
        ]
    }
    // Getting the path.
    return await handleFileOpen(mainWin, options)
})

// File Manager functions.
async function handleFileOpen(window, options) {
    const {canceled, filePaths} = await dialog.showOpenDialog(window, options)
    dialogIsOpen = false
    // If the user cancels the operation then just cancel.
    if (canceled) {
        return ""
    } else {
        // Otherwise return the filepath.
        return filePaths[0]
    }
}

async function handleFileSave(window, options) {
    const {canceled, filePath} = await dialog.showSaveDialog(window, options)
    dialogIsOpen = false
    // If the user cancels the operation then just cancel.
    if (canceled) {
        return ""
    } else {
        // Otherwise return the filepath.
        return filePath
    }
}

// Function to get reload time.
async function getReloadTime() {
    const Controller = new SettingsController()
    const settings = await Controller.getSettings()
    // If the login timeout is enabled. get the time.
    if (settings.loginTimeout) {
        return settings.loginTimeoutTime
    }
}

// Function to check for re-login.
async function checkForReload() {
    let currentTime = await reloadTime
    const checkInterval = setInterval(() => {
        // Reduce count by one.
        currentTime--
        // Clear the interval if the window is focused.
        if (mainWin.isFocused()) {
            clearInterval(checkInterval)
        }

        // Reload the window to ask for re-login if the count reaches 0.
        if (!currentTime) {
            // Reload the window.
            mainWin.webContents.reloadIgnoringCache()
            clearInterval(checkInterval)
        }
    }, 1000)
}