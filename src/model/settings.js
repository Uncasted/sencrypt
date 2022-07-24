const fs = require("fs")
const path = require("path")
const { getAppDataPath } = require("appdata-path")

class Settings {
  constructor() {
    this.settingsPath = path.join(getAppDataPath("sencrypt"), "./settings.json")
    this.settings = { settings: {} }
  }

  async init() {
    try {
      // Read the settings file.
      await this.read()
      const settingsFile = this.settings

      // Setting the default settings.
      settingsFile.settings = {
        loginTimeout: false,
        loginTimeoutTime: 1800,
        deleteAfterAttempts: false,
        deleteAttempts: 10,
      }

      // Write to the file.
      await this.write()
    } catch (error) {
      console.log("Error at init (Settings).")
      console.log(error)
    }
  }

  async start() {
    try {
      // Read the settings file.
      await this.read()
    } catch (error) {
      console.log("Error at start (Settings).")
      console.log(error)
    }
  }

  async read() {
    try {
      // If the file exists, then read it.
      if (fs.existsSync(this.settingsPath)) {
        const settingsData = await fs.promises.readFile(
          this.settingsPath,
          "utf-8"
        )
        this.settings = JSON.parse(settingsData)
      } else {
        // Otherwise, create the file.
        const settingsScheme = JSON.stringify({ settings: {} })
        // Create the settings file.
        await fs.promises.writeFile(this.settingsPath, settingsScheme, "utf-8")

        // Read the file.
        const settingsData = await fs.promises.readFile(
          this.settingsPath,
          "utf-8"
        )
        this.settings = JSON.parse(settingsData)
      }
    } catch (error) {
      console.log("Error at read (Settings).")
      console.log(error)
    }
  }

  async write() {
    try {
      // Writing the settings into the settings file.
      const settingsToWrite = JSON.stringify(this.settings)
      await fs.promises.writeFile(this.settingsPath, settingsToWrite, "utf-8")
    } catch (error) {
      console.log("Error at write (Settings).")
      console.log(error)
    }
  }

  async getSettings() {
    try {
      // Read the settings.
      await this.read()
      const { settings } = this.settings

      // Return the settings.
      return settings
    } catch (error) {
      console.log("Error at getSettings (Settings).")
      console.log(error)
    }
  }

  async updateSetting(option, value) {
    try {
      // Read the settings.
      await this.read()
      const { settings } = this.settings

      // Update the settings option.
      settings[option] = value

      // Write into the settings.
      await this.write()
    } catch (error) {
      console.log("Error at updateSetting (Settings).")
      console.log(error)
    }
  }
}

module.exports = Settings
