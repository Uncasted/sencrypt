// Preload (Tray Menu)
const { contextBridge, ipcRenderer } = require('electron')

// Open application sections through the tray menu.
contextBridge.exposeInMainWorld('controller', {
  openSection: (section) => {
    ipcRenderer.send('open:section', section)
  },
  quitApplication: () => {
    ipcRenderer.send('app:quit')
  }
})
