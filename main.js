const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const auth = require('./src/controller/authController');

// Main Window.
const createMainWindow = () => {
    const mainWin = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, "src/controller/authPreload.js")
        }
    });

    // Load index.html.
    mainWin.loadFile("index.html");
};

ipcMain.on('login:first', async (e, password) => {
   await auth.createMasterPassword(password);
})

// Starting the app.
app.whenReady().then(() => {
    createMainWindow();

    // Open a window if none are open.
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    })
});

// Quit the app when we close all windows. (Except on macOS)
app.on('window-all-closed', () => {
    if (process.platform !== "darwin") app.quit();
});