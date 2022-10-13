const settings = require('../model/settings')

/** Static controller that manages the settings.*/
class SettingsController {
  /**
   * Controller wrapper for creating the settings for the first time.
   * @see {settings.createSettings} for more information.
   **/
  static createSettings = async () => {
    await settings.createSettings()
  }

  /**
   * Controller wrapper or obtaining a single setting of the settings file.
   * @see {settings.getSetting} for more information.
   * @param {string} option Selected Option.
   * @returns {Promise<string|number|boolean>} Returns the selected option.
   **/
  static getSetting = async (option) => {
    return await settings.getSetting(option)
  }

  /**
   * Controller wrapper to get all the settings from the settings file.
   * @see {settings.getAllSettings} for more information.
   * @returns {Promise<Settings>} Settings object.
   **/
  static getAllSettings = async () => {
    return await settings.getAllSettings()
  }

  /**
   * Controller wrapper to update a setting's value on the settings file.
   * @see {settings.updateSetting} for more information.
   * @param {string} option Selected Option.
   * @param {string|number|boolean} value New value.
   **/
  static updateSetting = async (option, value) => {
    await settings.updateSetting(option, value)
  }
}

module.exports = SettingsController
