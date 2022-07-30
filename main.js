const { app, BrowserWindow, dialog, ipcMain, Tray } = require('electron')
const SettingsController = require('./src/controller/settingsController')
const path = require('path')

// Check if the file explorer is opened.
let dialogIsOpen = false
// Time to wait for re-login.
const reloadTime = getReloadTime()
// Main Window.
let MainWin
// Tray Menu.
let TrayMenu
// Tray menu custom window.
let TrayWin
// Create the main window.
const createMainWindow = async () => {
  // Change the icon path depending on the platform.
  const iconPath =
    process.platform !== 'darwin' ? './build/icon.png' : './build/icon.icns'

  MainWin = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    autoHideMenuBar: true,
    frame: false,
    icon: path.join(__dirname, iconPath),
    webPreferences: {
      preload: path.join(__dirname, './src/controller/applicationPreload.js')
    }
  })
  await MainWin.loadFile(path.join(__dirname, './src/view/application-window/dist/index.html'))
  // When the main window is closed, close the tray window.
  // MainWin.on('closed', () => {
  //   TrayWin.destroy()
  // })
  MainWin.on('close', (event) => {
    // Prevent the main window from getting destroyed.
    event.preventDefault()
    // Hiding the main window.
    MainWin.hide()
  })
}

// Create Tray window.
const createTray = () => {
  TrayMenu = new Tray(path.join(__dirname, './build/icon.png'))

  // Toggle the tray window.
  TrayMenu.on('right-click', () => {
    // If the window is visible hide it, otherwise show it.
    if (TrayWin.isVisible()) {
      TrayWin.hide()
    } else {
      showWindow()
    }
  })
  // Focus the main window on double click.
  TrayMenu.on('double-click', () => {
    // If the main window is hidden, show it.
    if (!MainWin.isVisible()) {
      MainWin.show()
    }
    // Focus on the window.
    MainWin.focus()
  })
}

// Creates window & specifies its values
const createTrayWindow = async () => {
  TrayWin = new BrowserWindow({
    width: 180,
    height: 240,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, './src/controller/trayPreload.js')
    }
  })
  // This is where the index.html file is loaded into the window
  await TrayWin.loadFile(path.join(__dirname, './src/view/tray-window/dist/index.html'))
  // Hide the Tray window when it loses focus.
  TrayWin.on('blur', () => {
    TrayWin.hide()
  })
}

// Starting the app.
app.on('ready', () => {
  createMainWindow().then(() => {
    createTrayWindow().then(() => {
      createTray()
    })
  })
  // Open a window if none are open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow().then()
  })
})
// // Quit the app when we close all windows. (Except on macOS)
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     // Remove the tray icon.
//     TrayMenu.destroy()
//     // Quit the app.
//     app.quit()
//   }
// })

// Timeout for re-login.
app.on('browser-window-blur', () => {
  // If the main window is not focused and reload time is bigger than 0.
  if (!MainWin.isFocused() && reloadTime && !dialogIsOpen) {
    // Start the timeout.
    checkForReload().then()
  }
})

// Get the path to create the backup.
ipcMain.handle('backup:create', async () => {
  dialogIsOpen = true
  // Options for creating a backup.
  const options = {
    title: 'Create A Database Backup:',
    buttonLabel: 'Create Backup',
    defaultPath: 'databaseBackup.json',
    filters: [{ name: 'Database File (JSON)', extensions: ['json'] }]
  }
  // Getting the path.
  return await handleFileSave(MainWin, options)
})

// Get the path to load the backup.
ipcMain.handle('backup:load', async () => {
  dialogIsOpen = true
  // Options for loading a backup.
  const options = {
    title: 'Load A Database Backup:',
    buttonLabel: 'Load Backup',
    properties: ['openFile'],
    filters: [{ name: 'Database File (JSON)', extensions: ['json'] }]
  }
  // Getting the path.
  return await handleFileOpen(MainWin, options)
})

// Open section from the tray menu.
ipcMain.on('open:section', (event, section) => {
  // Hide the tray menu.
  TrayWin.hide()
  // Send the signal to the main window.
  MainWin.webContents.send('view:section', section)
  // If the main window is hidden, show it.
  if (!MainWin.isVisible()) {
    MainWin.show()
  }
  // Focus the main window.
  MainWin.focus()
})

// Close the application from the tray menu.
ipcMain.on('app:quit', () => {
  // Destroy the windows.
  MainWin.destroy()
  TrayWin.destroy()
  TrayMenu.destroy()
  // Quit the app.
  app.quit()
})

// Minimizing the window.
ipcMain.on('mainWin:minimize', () => {
  MainWin.minimize()
})
// Maximize the window.
ipcMain.on('mainWin:maximize', () => {
  // If the window is maximized, unmaximize it.
  if (MainWin.isMaximized()) {
    MainWin.unmaximize()
  } else {
    MainWin.maximize()
  }
})
// Close the window.
ipcMain.on('mainWin:close', () => {
  MainWin.hide()
})

// File Manager functions.
async function handleFileOpen (window, options) {
  const { canceled, filePaths } = await dialog.showOpenDialog(window, options)
  dialogIsOpen = false
  // If the user cancels the operation then just cancel.
  if (canceled) {
    return ''
  } else {
    // Otherwise return the filepath.
    return filePaths[0]
  }
}

async function handleFileSave (window, options) {
  const { canceled, filePath } = await dialog.showSaveDialog(window, options)
  dialogIsOpen = false
  // If the user cancels the operation then just cancel.
  if (canceled) {
    return ''
  } else {
    // Otherwise return the filepath.
    return filePath
  }
}

// Function to get reload time.
async function getReloadTime () {
  const Controller = new SettingsController()
  const settings = await Controller.getSettings()
  // If the login timeout is enabled. get the time.
  if (settings.loginTimeout) {
    return settings.loginTimeoutTime
  } else {
    return 0
  }
}

// Function to check for re-login.
async function checkForReload () {
  let currentTime = await reloadTime
  const checkInterval = setInterval(() => {
    // Reduce count by one.
    currentTime--
    // Clear the interval if the window is focused.
    if (MainWin.isFocused()) {
      clearInterval(checkInterval)
    }

    // Reload the window to ask for re-login if the count reaches 0.
    if (!currentTime) {
      // Reload the window.
      MainWin.webContents.reloadIgnoringCache()
      clearInterval(checkInterval)
    }
  }, 1000)
}

// Function to get the position for the tray window.
function getTrayPosition () {
  const windowBounds = TrayWin.getBounds()
  const trayBounds = TrayMenu.getBounds()

  // Center window horizontally to the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
  // Position the window vertically to the tray icon
  const y = Math.round(trayBounds.y - windowBounds.height - 4)

  return { x, y }
}

function showWindow () {
  const position = getTrayPosition()
  TrayWin.setPosition(position.x, position.y, false)
  TrayWin.show()
  TrayWin.focus()
}
