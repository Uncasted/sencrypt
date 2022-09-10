const Database = require('../database')
const { DATABASE_PATH } = require('../constants')
const { readFile } = require('../utility')
const { getAppDataPath } = require('appdata-path')
const path = require('path')
const fs = require('fs')

beforeAll(async () => {
  // Initialize the database.
  const myDB = new Database()
  await myDB.init('password123')
})

describe('Misc Operations', () => {
  test('Initializing the database', async () => {
    const myDB = new Database()
    await myDB.init('password123')
    const databaseFile = await readFile(DATABASE_PATH)
    // Comparing database file and object.
    expect(myDB.SEC_KEY_2).toBe(databaseFile.SEC_KEY_2)
    expect(myDB.ENC_MP).toBe(databaseFile.ENC_MP)
    expect([]).toEqual(databaseFile[databaseFile.ENC_MP])
  })

  test('starting the database', async () => {
    const myDB = new Database()
    // Setting the data.
    await myDB.start('password123')
    const databaseFile = await readFile(DATABASE_PATH)
    // Comparing database file and object.
    expect(myDB.SEC_KEY_2).toBe(databaseFile.SEC_KEY_2)
    expect(myDB.ENC_MP).toBe(databaseFile.ENC_MP)
    expect([]).toEqual(databaseFile[databaseFile.ENC_MP])
  })

  test('Verify the master password', async () => {
    const myDB = new Database()
    const isMP = await myDB.verifyMasterPassword('password123')
    const fakeMP = await myDB.verifyMasterPassword('anotherPass')

    expect(isMP).toBe(true)
    expect(fakeMP).toBe(false)
  })

  test('Get the length from the database', async () => {
    const myDB = new Database()
    const dbLength = await myDB.getNumberOfAccounts()
    // Get the length from the database file.
    const fileLength = Object.keys(await readFile(DATABASE_PATH)).length

    expect(dbLength).toBe(fileLength)
  })

  test('Reset the master password.', async () => {
    const myDB = new Database()
    // We need to start the database first, otherwise we can't reset the password.
    await myDB.start('password123')
    await myDB.resetMasterPassword('admin123')
    const databaseFile = await readFile(DATABASE_PATH)

    expect(myDB.ENC_MP).toBe(databaseFile.ENC_MP)
  })

  test('Clear the database', async () => {
    const myDB = new Database()
    // Start the database for comparisons.
    await myDB.start('admin123')
    await myDB.clearDatabase()
    // Get the database file for comparisons.
    const databaseFile = await readFile(DATABASE_PATH)

    expect(databaseFile[databaseFile.ENC_MP]).toEqual([])
    expect(myDB.SEC_KEY_2).toBe(databaseFile.SEC_KEY_2)
    expect(myDB.ENC_MP).toBe(databaseFile.ENC_MP)
  })
})

describe('Backup operations', () => {
  test('Create a database backup', async () => {
    const backupPath = path.join(getAppDataPath('sencrypt'), './databaseBackup.json')
    const myDB = new Database()
    // Start the database to compare to the backup.
    await myDB.start('admin123')
    // Create the backup.
    await myDB.createBackup(backupPath)
    const backupFile = await readFile(backupPath)
    // Comparing database file and object.
    expect(myDB.SEC_KEY_2).toBe(backupFile.SEC_KEY_2)
    expect(myDB.ENC_MP).toBe(backupFile.ENC_MP)
    expect([]).toEqual(backupFile[backupFile.ENC_MP])
  })

  test('Verify a database backup', async () => {
    const backupPath = path.join(getAppDataPath('sencrypt'), './databaseBackup.json')
    const myDB = new Database()
    const isVerified = await myDB.verifyBackup(backupPath)
    const isFakeVerified = await myDB.verifyBackup('')
    const isAnotherFakeVerified = await myDB.verifyBackup('fjei2fjjsjq')

    expect(isVerified).toBe(true)
    expect(isFakeVerified).toBe(false)
    expect(isAnotherFakeVerified).toBe(false)
  })

  test('Load a database backup', async () => {
    const backupPath = path.join(getAppDataPath('sencrypt'), './databaseBackup.json')
    const myDB = new Database()
    await myDB.start('admin123')
    const backupFile = await readFile(backupPath)
    // Load the backup.
    await myDB.loadBackup(backupPath)

    expect(myDB.SEC_KEY_2).toBe(backupFile.SEC_KEY_2)
    expect(myDB.ENC_MP).toBe(backupFile.ENC_MP)
    expect([]).toEqual(backupFile[backupFile.ENC_MP])
  })
})

describe('CRUD operations', () => {
  test('Creating an account', async () => {
    const myDB = new Database()
    await myDB.start('admin123')
    const myAccount = {
      username: 'username',
      password: '123',
      website: 'twitter.com'
    }
    // Create the account and get all the accounts to compare.
    await myDB.createAccount(myAccount)
    const accounts = await myDB.getAllAccounts()

    expect(accounts[0]).toEqual(myAccount)
    // Clear the database.
    await myDB.clearDatabase()
  })

  test('Get all the accounts', async () => {
    const myDB = new Database()
    await myDB.start('admin123')
    // Create a list of accounts.
    const myAccounts = [
      {
        website: 'google.com',
        username: 'username',
        password: 'password'
      },
      {
        website: 'reddit.com',
        username: 'admin',
        password: '123'
      }
    ]

    for (const account of myAccounts) {
      await myDB.createAccount(account)
    }

    const accounts = await myDB.getAllAccounts()
    expect(accounts).toEqual(myAccounts)

    await myDB.clearDatabase()
  })

  test('Update an account', async () => {
    const oldAccount = {
      website: 'twitter.com',
      username: 'username',
      password: 'pass123'
    }

    const newAccount = {
      website: 'twitter.com',
      username: 'admin123',
      password: 'newPassKey'
    }

    const myDB = new Database()
    await myDB.start('admin123')
    // Create and update the account.
    await myDB.createAccount(oldAccount)
    await myDB.updateAccount(0, newAccount)
    await myDB.updateAccount(10, {})

    const accounts = await myDB.getAllAccounts()

    expect(accounts[0]).toEqual(newAccount)
    expect(accounts[10]).toBeUndefined()

    await myDB.clearDatabase()
  })

  test('Delete an account', async () => {
    const myAccount = {
      website: 'twitter.com',
      username: 'admin123',
      password: 'newPassKey'
    }

    const myDB = new Database()
    await myDB.start('admin123')
    // Create an account and delete it.
    await myDB.createAccount(myAccount)
    await myDB.deleteAccount(0)

    const accounts = await myDB.getAllAccounts()
    expect(accounts.length).toBe(0)
  })
})

afterAll(async () => {
  // Delete the fake backup file after the test finishes.
  await fs.promises.unlink('fjei2fjjsjq')
})
