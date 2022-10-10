// Utility functions.
const { UTF8, AES256, BASE64, CHARS } = require('./constants')
const crypto = require('crypto')
const fs = require('fs')

/**
 *  This function reads the JSON file provided from the filePath, if the file
 *  doesn't exist a second parameter can be provided to create a file with
 *  default values.
 *  @param {string} filePath Path of the file.
 *  @param {object} defaultValue Default value in case the file doesn't exist.
 *  @returns {object} JSON value of the file.
 **/
exports.readFile = async (filePath, defaultValue = {}) => {
  if (!fs.existsSync(filePath) && filePath) {
    // If it doesn't exist, create the file with the default value.
    await fs.promises.writeFile(filePath, JSON.stringify(defaultValue), UTF8)
  }
  if (filePath) {
    return JSON.parse(await fs.promises.readFile(filePath, UTF8))
  }
}

/**
 * This function writes data to a JSON file.
 * @param {string} filePath Path of the file.
 * @param {string} data Data to write.
 **/
exports.writeFile = async (filePath, data) => {
  if (filePath) {
    const jsonData = JSON.stringify(data)
    await fs.promises.writeFile(filePath, jsonData, UTF8)
  }
}

/**
 * This function generates a random string of characters of a specified length.
 * @param {number} length Length of the string.
 * @returns {string} Random string of characters.
 **/
exports.randomChars = (length) => {
  const alphaNumChars = CHARS.NUMBERS + CHARS.UPPERCASE + CHARS.LOWERCASE
  let randomChars = ''

  for (let i = 0; i < length; i++) {
    randomChars +=
      alphaNumChars[Math.floor(Math.random() * alphaNumChars.length)]
  }

  return randomChars
}

/**
 * This function generates a random key that is used as a second part of the
 * secret key for the database. It returns the second part of the key
 * and the initialization vector used for AES encryption.
 * @param {number} length Length of the first part of the key.
 * @returns {string} Second part of the secret key.
 **/
exports.generateRandomKey = (length) => {
  if (length >= 32) {
    // If the length is already 32 just return the initializer vector.
    const INIT_VEC = exports.randomChars(16)
    return `:${INIT_VEC}`
  }
  // Second part of the key needs to make the secret key 32 bytes long.
  const SEC_KEY_2 = exports.randomChars(32 - length)
  const INIT_VEC = exports.randomChars(16)

  return `${SEC_KEY_2}:${INIT_VEC}`
}

/**
 * This function generates a random password based on the parameters and the
 * length passed to them.
 * @param {string[]} parameters List of parameters to be used.
 * @param {number} length Length of the password.
 * @returns {string} Generated password.
 **/
exports.generateRandomPassword = (parameters, length) => {
  let password = ''
  let charType = 0
  for (let i = 0; i < length; i++) {
    // We do this to guarantee at least one char of each type of the
    // parameter in the generated password.
    if (charType === parameters.length) {
      charType = 0
    }

    password += CHARS[parameters[charType]][Math.floor(Math.random() *
      CHARS[parameters[charType]].length)]

    charType++
  }

  return password
}

/**
 * This function is used to encrypt a string with a secret key, it returns the
 * encrypted text.
 * @param {string} text String to be encrypted.
 * @param {string} SEC_KEY Secret key.
 * @returns {string} Encrypted key.
 **/
exports.encrypt = (text, SEC_KEY) => {
  // Get the key and the initialization vector.
  const [secretKey, IV] = SEC_KEY.split(':')
  // Encrypt the text.
  const cipher = crypto.createCipheriv(AES256, secretKey, IV)
  let encryptedText = cipher.update(text, UTF8, BASE64)
  encryptedText += cipher.final(BASE64)

  return encryptedText
}

/**
 *  This function is used to decrypt a string with the secret key, it
 *  returns the decrypted text.
 *  @param {string} encryptedText Encrypted text.
 *  @param {string} SEC_KEY Secret key.
 *  @returns {string} Decrypted string.
 **/
exports.decrypt = (encryptedText, SEC_KEY) => {
  const [secretKey, IV] = SEC_KEY.split(':')

  const decipher = crypto.createDecipheriv(AES256, secretKey, IV)
  let decryptedText = decipher.update(encryptedText, BASE64, UTF8)
  decryptedText += decipher.final(UTF8)

  return decryptedText
}

/**
 * This function is used to generate a salt for the master password encryption.
 * @returns {string} Password salt.
 **/
exports.generateSalt = () => {
  return crypto.randomBytes(16).toString(BASE64)
}

/**
 * This function is used to encrypt the master password, using a salt and
 * the crypto scrypt function.
 * @param {string} password Master password.
 * @param {string} salt Salt for the password.
 **/
exports.encryptMasterPassword = (password, salt) => {
  const hash = crypto.scryptSync(password, salt, 64).toString(BASE64)
  return `${salt}:${hash}`
}
