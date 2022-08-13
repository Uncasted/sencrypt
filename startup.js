const SettingsController = require('./src/controller/settingsController')

async function getStartupMinimized () {
  const Controller = new SettingsController()
  const settings = await Controller.getSettings()
  return settings.startupMinimized
}

module.exports = {
  getStartupMinimized
}
