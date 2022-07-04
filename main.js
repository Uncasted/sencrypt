const {app, BrowserWindow} = require('electron')
const path = require('path')

// Main Window.
const createMainWindow = async () => {

    const mainWin = new BrowserWindow({
        width: 1280,
        height: 720,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, "/src/controller/preload.js")
        }
    })
    await mainWin.loadFile(path.join(__dirname, "/src/view/password-manager/dist/index.html"))
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