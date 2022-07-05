const {app, BrowserWindow} = require('electron')
const path = require('path')

// Main Window.
const createMainWindow = async () => {
    // Change the icon path depending on the platform."
    const iconPath = process.platform !== "darwin" ? "./appIcon.png" : "./appIcon.icns"

    const mainWin = new BrowserWindow({
        width: 1280,
        height: 720,
        minWidth: 800,
        minHeight: 500,
        autoHideMenuBar: true,
        icon: path.join(__dirname, iconPath),
        webPreferences: {
            preload: path.join(__dirname, "./src/controller/preload.js")
        }
    })
    await mainWin.loadFile(path.join(__dirname, "./src/view/password-manager/dist/index.html"))
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