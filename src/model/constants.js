const path = require('path')
const { getAppDataPath } = require('appdata-path')

/**
 * Object that contains alphanumeric characters and symbols.
 **/
exports.CHARS = {
  NUMBERS: '012346789',
  UPPERCASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  LOWERCASE: 'abcdefghijklmnopqrstuvwxyz',
  SYMBOLS: '~`! @#$%^&*()_-+={[}]|\\:;"\'<,>.?/'
}

/**
 * UTF-8 encoding setting.
 **/
exports.UTF8 = 'utf-8'
/**
 * Base64 encoding setting.
 **/
exports.BASE64 = 'base64'

/**
 * Default application settings.
 **/
exports.DEFAULT_SETTINGS = {
  minToTray: false,
  openAtStartup: false,
  startupMode: 'Full',
  loginTimeout: false,
  loginTimeoutTime: 1800,
  deleteAfterAttempts: false,
  deleteAttempts: 10
}

/**
 * AES-256 Encryption setting.
 **/
exports.AES256 = 'aes-256-cbc'

/**
 * Path of the database file.
 **/
exports.DATABASE_PATH = path.join(
  getAppDataPath('sencrypt'),
  './database.json'
)

/**
 * Path of the settings file.
 **/
exports.SETTINGS_PATH = path.join(
  getAppDataPath('sencrypt'),
  './settings.json'
)