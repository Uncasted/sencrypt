const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const auth = require('./src/controller/authController');

// Main Window.
const createMainWindow = async () => {
    let options = {
        preload: "src/controller/authPreload.js",
        view: "src/view/existingUser.html"
    };

    if (await auth.isNewUser()) {
        options = {
            preload: "src/controller/firstTimePreload.js",
            view: "src/view/firstTime.html"
        }
    }

    const mainWin = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, options.preload)
        }
    });

    await mainWin.loadFile(path.join(__dirname, options.view))
};

ipcMain.on('login:first', async (e, password) => {
   await auth.createMasterPassword(password);
})

ipcMain.on('login:master', async (e, password) => {
    if (password.length !== 0) {
       const result = await auth.validatePassword(password);
       console.log(result);
    }
});

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