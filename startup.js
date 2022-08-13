const SettingsController = require('./src/controller/settingsController')

async function getStartupMode () {
  const Controller = new SettingsController()
  const settings = await Controller.getSettings()
  return settings.startupMode
}

module.exports = {
  getStartupMode
}
