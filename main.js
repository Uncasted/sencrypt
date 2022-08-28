const { app, BrowserWindow, ipcMain, Tray, Menu, shell } = require('electron')
const path = require('path')
const login = require('./login')
const tray = require('./tray')
const filePath = require('./filePath')
const { getTraySetting } = require('./tray')
const startup = require('./startup')
const SettingsController = require('./src/controller/settingsController')

// Disable hardware acceleration.
app.disableHardwareAcceleration()

// Check if the file explorer is opened.
let dialogIsOpen = false
// Main Window.
let MainWin
// Tray Menu.
let TrayMenu
// Tray menu custom window.
let TrayWin
// Context menu for tray (Linux).
const contextMenu = Menu.buildFromTemplate([
  {
    label: 'Accounts',
    click: () => {
      showSection('Accounts')
    }
  },
  {
    label: 'Generator',
    click: () => {
      showSection('Generator')
    }
  },
  {
    label: 'Settings',
    click: () => {
      showSection('Settings')
    }
  },
  {
    label: 'Exit',
    click: quitAll
  }
])

// Utility functions.

function quitAll () {
  // Destroy the windows (If they exist).
  MainWin.destroy()
  if (TrayWin) {
    TrayWin.destroy()
  }
  if (TrayMenu) {
    TrayMenu.destroy()
  }
  // Quit the app.
  app.quit()
}

function showMainWindow () {
  // If the main window is hidden, show it.
  if (!MainWin.isVisible()) {
    MainWin.show()
  }
  // Focus the main window.
  MainWin.focus()
}

function showSection (section) {
  // Hide the tray menu.
  TrayWin.hide()
  // Send the signal to the main window.
  MainWin.webContents.send('view:section', section)
  // Show the main window.
  showMainWindow()
}

// Windows

// Create the main window.
async function createMainWindow () {
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
    show: false,
    webPreferences: {
      preload: path.join(__dirname, './src/controller/applicationPreload.js')
    }
  })
  await MainWin.loadFile(
    path.join(__dirname, './src/view/application-window/dist/index.html')
  )

  MainWin.on('close', event => {
    // If the tray window exists.
    if (TrayMenu) {
      // Prevent the main window from getting destroyed.
      event.preventDefault()
      // Hiding the main window.
      MainWin.hide()
    }
    // Otherwise just quit the app.
    quitAll()
  })
}

// Create Tray window.
function createTray () {
  TrayMenu = new Tray(path.join(__dirname, '/icon.png'))
  // Tooltip
  TrayMenu.setToolTip('Sencrypt')
  // Set the context menu on linux.
  if (process.platform === 'linux') {
    TrayMenu.setContextMenu(contextMenu)
  }
  // Toggle the tray window. (Windows)
  TrayMenu.on('right-click', () => {
    // If the window is visible hide it, otherwise show it.
    tray.toggleTrayWindow(TrayWin, TrayMenu)
  })
  // Focus the main window on double click. (Windows)
  TrayMenu.on('double-click', () => {
    // If the main window is hidden, show it.
    showMainWindow()
  })
}

// Creates window & specifies its values
async function createTrayWindow () {
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
  await TrayWin.loadFile(
    path.join(__dirname, './src/view/tray-window/dist/index.html')
  )
  // Hide the Tray window when it loses focus.
  TrayWin.on('blur', () => {
    TrayWin.hide()
  })
}

// IPC Main event listeners

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
  const path = await filePath.handleFileSave(MainWin, options)
  dialogIsOpen = false
  return path
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
  const path = await filePath.handleFileOpen(MainWin, options)
  dialogIsOpen = false
  return path
})

// Toggling the tray menu.
ipcMain.on('toggle:tray', (event, isEnabled) => {
  if (isEnabled) {
    // Create the tray window.
    createTrayWindow().then(() => {
      createTray()
    })
  } else {
    // Destroy the current tray.
    TrayWin.destroy()
    TrayMenu.destroy()
  }
})

// Toggling open at startup (Windows).
ipcMain.on('toggle:startup', (event, isStartupEnabled) => {
  app.setLoginItemSettings({
    openAtLogin: isStartupEnabled,
    path: app.getPath('exe')
  })
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
  getTraySetting().then(isEnabled => {
    // If the tray icon is enabled, hide the window.
    if (isEnabled) {
      MainWin.hide()
    } else {
      // Quit the app.
      MainWin.destroy()
      app.quit()
    }
  })
})

// Open section from the tray menu.
ipcMain.on('open:section', (event, section) => {
  showSection(section)
})

// Open the anchor link from the settings section.
ipcMain.on('open:url', (event, URL) => {
  shell.openExternal(URL).then()
})

// Close the application from the tray menu or the main window shortcut.
ipcMain.on('app:quit', quitAll)

// App event listeners.

// Starting the app.
app.on('ready', () => {
  // Start the settings.
  const Settings = new SettingsController()
  Settings.start().then(() => {
    createMainWindow().then(() => {
      // Show the main window when it's ready.
      startup.getStartupMode().then(startupMode => {
        // If startupMode is full then we show the window.
        if (startupMode === 'Full') {
          MainWin.show()
        }
      })
      getTraySetting().then(isEnabled => {
        if (isEnabled) {
          // Create the tray window.
          createTrayWindow().then(() => {
            createTray()
          })
        }
      })
    })
  })
  // Open a window if none are open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow().then()
  })
})

// Timeout for re-login.
app.on('browser-window-blur', () => {
  login.getReloadTime().then(reloadTime => {
    // If the main window is not focused and reload time is bigger than 0.
    if (!MainWin.isFocused() && reloadTime && !dialogIsOpen) {
      // Start the timeout.
      login.checkForReload(MainWin, reloadTime).then()
    }
  })
})
