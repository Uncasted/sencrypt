const {app, BrowserWindow} = require('electron');

// Main Window.
const createMainWindow = () => {
    const mainWin = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true
    });

    // Load index.html.
    mainWin.loadFile("index.html");
};

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