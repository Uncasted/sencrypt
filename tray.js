// Get the position of the tray icon.
function getTrayPosition (trayWin, trayMenu) {
  const windowBounds = trayWin.getBounds()
  const trayBounds = trayMenu.getBounds()

  // Center window horizontally to the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
  // Position the window vertically to the tray icon
  const y = Math.round(trayBounds.y - windowBounds.height - 4)

  return { x, y }
}

// Show the tray window.
function showTrayWindow (trayWin, trayMenu) {
  const position = getTrayPosition(trayWin, trayMenu)
  trayWin.setPosition(position.x, position.y, false)
  trayWin.show()
  trayWin.focus()
}

// Toggle the window.
function toggleTrayWindow (trayWin, trayMenu) {
  if (trayWin.isVisible()) {
    trayWin.hide()
  } else {
    showTrayWindow(trayWin, trayMenu)
  }
}

module.exports = {
  toggleTrayWindow
}
