// Function to get reload time for re-login.
const SettingsController = require("./src/controller/settingsController")

async function getReloadTime() {
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
async function checkForReload(window, reloadTime) {
  let currentTime = reloadTime
  const checkInterval = setInterval(() => {
    // Reduce count by one.
    currentTime--
    // Clear the interval if the window is focused.
    if (window.isFocused()) {
      clearInterval(checkInterval)
    }

    // Reload the window to ask for re-login if the count reaches 0.
    if (!currentTime) {
      // Reload the window.
      window.webContents.reloadIgnoringCache()
      clearInterval(checkInterval)
    }
  }, 1000)
}

module.exports = {
  getReloadTime,
  checkForReload
}
