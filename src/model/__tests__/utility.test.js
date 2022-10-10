const utility = require('../utility')
const fs = require('fs')
const {
  DATABASE_PATH,
  DEFAULT_SETTINGS,
  SETTINGS_PATH,
  UTF8, BASE64
} = require('../constants')
const crypto = require('crypto')

test('Reading a file', async () => {
  // Getting the database with utility read file.
  const dbFromReadFile = await utility.readFile(DATABASE_PATH, {})
  // Using fs module to compare.
  const dbFromFS = JSON.parse(await fs.promises.readFile(DATABASE_PATH, UTF8))

  expect(dbFromReadFile).toEqual(dbFromFS ?? {})
})

test('Writing a file', async () => {
  // Writing to the settings with the utility.
  await utility.writeFile(SETTINGS_PATH, DEFAULT_SETTINGS)
  // Getting the default settings and comparing them.
  const settings = JSON.parse(await fs.promises.readFile(SETTINGS_PATH, UTF8))

  expect(settings).toEqual(DEFAULT_SETTINGS)
})

test('Generating random chars', () => {
  const lengths = [10, 16, 24, 32]
  // Testing every length provided.
  for (const length of lengths) {
    // Testing that it's a string and the length provided.
    const randomChars = utility.randomChars(length)

    expect(typeof randomChars).toBe('string')
    expect(randomChars.length).toBe(length)
  }
})

test('Generate random key', () => {
  const lengths = [10, 16, 24, 32]
  // Testing every length provided.
  for (const length of lengths) {
    // Testing that it's a string and the length provided.
    const randomKey = utility.generateRandomKey(length)

    expect(typeof randomKey).toBe('string')
    expect(randomKey.length).toBe(32 - length + 17)
  }
})

test('Generate random password', () => {
  // Parameters for the generator.
  const parameters = ['UPPERCASE', 'LOWERCASE', 'NUMBERS', 'SYMBOLS']
  const length = 16
  // Generate the password.
  const generatedPassword = utility.generateRandomPassword(parameters, length)
  expect(typeof generatedPassword).toBe('string')
  expect(generatedPassword.length).toBe(length)
  // Check if it has numbers.
  expect(/\d/.test(generatedPassword)).toBe(true)
  // Check if it has symbols.
  expect(/[~`!@#$%^&*()_\-+={\[}|:;"'<,>.?/]+/.test(generatedPassword)
  ).toBe(true)
})

test('Encrypt master password', () => {
  const masterPassword = 'password123'
  const salt = utility.generateSalt()
  const encryptedMP = utility.encryptMasterPassword(masterPassword, salt)
  // Using the crypto library.
  const hash = crypto.scryptSync(masterPassword, salt, 64).toString(BASE64)
  const anotherEncMP = `${salt}:${hash}`

  expect(encryptedMP).toBe(anotherEncMP)
})

