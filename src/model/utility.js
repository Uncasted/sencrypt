// Utility functions.
const crypto = require('crypto')
const CHARS = require('./constants')

// Generate random chars.
function randomChars (length) {
  const alphaNumChars = CHARS.NUMBERS + CHARS.UPPERCASE + CHARS.LOWERCASE
  let randomChars = ''

  for (let i = 0; i < length; i++) {
    // Take random char from alphabet.
    randomChars +=
      alphaNumChars[Math.floor(Math.random() * alphaNumChars.length)]
  }

  return randomChars
}

// Generate random SEC_KEY_2 and INIT_VEC.
function generateRandomKey (length) {
  if (length === 32) {
    // If the length is already 32 just return the INIT_VEC.
    return randomChars(16)
  }
  // Second part of the key needs to make the secret key 32 bytes long.
  const SEC_KEY_2 = randomChars(32 - length)
  // Initialization vector
  const INIT_VEC = randomChars(16)

  return `${SEC_KEY_2}:${INIT_VEC}`
}

// Generate a random password.
function generateRandomPassword (parameters, length) {
  let charList = ''
  let password = ''
  // Add the chars to the list of chars (depending on the parameters) to be used to create the password.
  for (const parameter of parameters) {
    charList += CHARS[parameter]
  }
  // Generate a password of the desired length.
  for (let i = 0; i < length; i++) {
    password += charList[Math.floor(Math.random() * charList.length)]
  }

  return password
}

function encrypt (text, SEC_KEY) {
  // Get the key and the initialization vector.
  const [secretKey, IV] = SEC_KEY.split(':')
  // Encrypt the text.
  const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, IV)
  let encryptedText = cipher.update(text, 'utf-8', 'base64')
  encryptedText += cipher.final('base64')
  return encryptedText
}

function decrypt (encryptedText, SEC_KEY) {
  // Get the key and initialization vector.
  const [secretKey, IV] = SEC_KEY.split(':')
  // Decrypt the text.
  const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, IV)
  let decryptedText = decipher.update(encryptedText, 'base64', 'utf8')
  decryptedText += decipher.final('utf8')
  return decryptedText
}

function hasProperty (obj, prop) {
  return Object.getOwnPropertyDescriptor(obj, prop)
}

// Generate random salt for the master password.
function generateSalt () {
  return crypto.randomBytes(16).toString('base64')
}

// Encrypting the master password.
function encryptMasterPassword (password, salt) {
  const hash = crypto.scryptSync(password, salt, 64).toString('base64')
  // Return the salted hash of the master password.
  return `${salt}:${hash}`
}

module.exports = {
  generateRandomPassword,
  generateRandomKey,
  encrypt,
  decrypt,
  hasProperty,
  generateSalt,
  encryptMasterPassword
}
