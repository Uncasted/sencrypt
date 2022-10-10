const { readFile, writeFile } = require('./utility')
const { DEFAULT_SETTINGS, SETTINGS_PATH } = require('./constants')

/**
 * This module manages the settings for the application.
 * @module Settings
 **/
/**
 * This function creates the settings file used for the application's settings.
 **/
exports.createSettings = async () => {
  try {
    await readFile(SETTINGS_PATH, DEFAULT_SETTINGS)
  } catch (error) {
    console.error('Error at start (settings.js).', error)
  }
}

/**
 * This function returns a single option from the settings file.
 * @param {string} option Setting's option.
 * @returns {Promise<string|number|boolean>} Option's value.
 **/
exports.getSetting = async (option) => {
  try {
    const settings = await readFile(SETTINGS_PATH)
    return settings[option]
  } catch (error) {
    console.error('Error at getSetting (settings.js)', error)
  }
}

/**
 * This method returns all the settings from the settings file.
 * @returns {Promise<object>} Settings from the settings file.
 **/
exports.getAllSettings = async () => {
  try {
    return await readFile(SETTINGS_PATH)
  } catch (error) {
    console.error('Error at getAllSettings (settings.js).', error)
  }
}

/**
 * This method updates the value of one of the options in the settings file.
 * @param {string} option Setting's Option
 * @param {string|number|boolean} value Option's Value
 **/
exports.updateSetting = async (option, value) => {
  try {
    const settings = await readFile(SETTINGS_PATH)
    settings[option] = value

    await writeFile(SETTINGS_PATH, settings)
  } catch (error) {
    console.error('Error at updateSetting (settings.js).', error)
  }
}

