const Settings = require('../model/settings')

class SettingsController {
  constructor () {
    this.Model = new Settings()
  }

  async start () {
    try {
      // Start the settings.
      await this.Model.start()
    } catch (error) {
      console.log('Error at start (Controller).')
      console.log(error)
    }
  }

  async getSettings () {
    try {
      // Get the settings.
      return await this.Model.getSettings()
    } catch (error) {
      console.log('Error at getSettings (Controller).')
      console.log(error)
    }
  }

  async updateSetting (option, value) {
    try {
      // Update the settings option.
      await this.Model.updateSetting(option, value)
    } catch (error) {
      console.log('Error at updateSetting (Controller).')
      console.log(error)
    }
  }
}

module.exports = SettingsController
