const fs = require('fs')
const settings = require('../settings')
const { SETTINGS_PATH, DEFAULT_SETTINGS } = require('../constants')
const { readFile } = require('../utility')

beforeAll(async () => {
  // Delete the settings file.
  await fs.promises.unlink(SETTINGS_PATH)
})

test('Create the settings.', async () => {
  await settings.createSettings()
  const fileSettings = await readFile(SETTINGS_PATH)
  // Check if the settings file is created properly.
  expect(fileSettings).toEqual(DEFAULT_SETTINGS)
})

test('Get a setting.', async () => {
  const minToTray = await settings.getSetting('minToTray')

  expect(minToTray).toBe(DEFAULT_SETTINGS.minToTray)
})

test('Get all the settings.', async () => {
  const mySettings = await settings.getAllSettings()

  expect(mySettings).toEqual(DEFAULT_SETTINGS)
})

test('Update the setting.', async () => {
  await settings.updateSetting('minToTray', true)
  const fileSettings = await readFile(SETTINGS_PATH)

  expect(fileSettings.minToTray).toBe(true)
})