const {app, BrowserWindow, dialog, ipcMain} = require('electron')
const path = require('path')

// Main Window.
let mainWin
const createMainWindow = async () => {
    // Change the icon path depending on the platform."
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

// Get the path to create the backup.
ipcMain.handle("backup:create", async () => {
    // Options for creating a backup.
    const options = {
        title: "Create A Database Backup",
        buttonLabel: "Create Backup",
        defaultPath: "backup.json",
        filters: [
            {name: "Database File", extensions: ["json"]}
        ]
    }
    // Getting the path.
    return await handleFileSave(mainWin, options)
})

// Get the path to load the backup.
ipcMain.handle("backup:load", async () => {
    // Options for loading a backup.
    const options = {
        title: "Load A Database Backup",
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
    // If the user cancels the operation then just cancel.
    if (canceled) {
        return ""
    } else {
        // Otherwise return the filepath.
        return filePath
    }
}