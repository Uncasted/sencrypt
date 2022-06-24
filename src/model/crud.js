const DBManager = require("./dbManager");
const path = require('path');
const encryption = require('./encryption');

const database = new DBManager(path.join(__dirname, "database.json"));

// Initializer
async function databaseInit(masterPassword) {
    try {
        await database.read();
        const {posts} = database.data;

        // Generate random Key (SK2)
        posts["SK2"] = encryption.genRandomKey(masterPassword.length);

        // Secret key
        const secretKey = masterPassword + posts["SK2"]

        // Generate Encrypted Master Password (Encrypted SK1)
        const encryptedSK1 = encryption.encrypt(masterPassword, secretKey);
        // This is done to extract the encrypted SK1 easily.
        posts["SK1"] = encryptedSK1;
        // This will handle the object that contains the usernames and passwords.
        posts[encryptedSK1] = {};

        await database.write();
    } catch (error) {
        console.log("Error at databaseInit.");
        console.log(error);
    }
}

// Get the second part of the key.
async function getKeyValue(key) {
    try {
        await database.read();
        const {posts} = database.data;

        return posts[key];
    } catch (error) {
        console.log("Error at getKeyValue");
        console.log(error);
    }
}

// Get the length of the posts object.
async function getDatabaseLength() {
    try {
        await database.read();
        const {posts} = database.data;

        return Object.keys(posts).length;
    } catch(error) {
        console.log("Error at getDatabaseLength");
        console.log(error);
    }
}

// Basic CRUD Operations.
async function createAccount(SK1, username, password) {
    try {
        await database.read();
        const {posts} = database.data;

        posts[SK1][username] = password;
        await database.write();
    } catch (error) {
        console.log("Error at createAccount.");
        console.log(error);
    }
}

async function getAccount(SK1, username) {
    try {
        await database.read();
        const {posts} = database.data;

        // Get the password from the posts object.
        const password = posts[SK1][username];
        return [username, password];
    } catch (error) {
        console.log("Error at getAccount.");
        console.log(error);
    }
}

async function updateUsername(SK1, oldUsername, newUsername) {
    try {
        await database.read();
        const {posts} = database.data;

        // Give the password to the new username.
        posts[SK1][newUsername] = posts[SK1][oldUsername];
        delete posts[SK1][oldUsername];
        await database.write();
    } catch (error) {
        console.log("Error at updateUsername.");
        console.log(error);
    }
}

async function updatePassword(SK1, username, newPassword) {
    try {
        await database.read();
        const {posts} = database.data;

        posts[SK1][username] = newPassword;
        await database.write();
    } catch (error) {
        console.log("Error at updatePassword.");
        console.log(error);
    }
}

async function deleteAccount(SK1, username) {
    try {
        await database.read();
        const {posts} = database.data;

        delete posts[SK1][username];
        await database.write();
    } catch (error) {
        console.log("Error at deleteAccount");
        console.log(error);
    }
}

module.exports.getKeyValue = getKeyValue;
module.exports.getDatabaseLength = getDatabaseLength;
module.exports.databaseInit = databaseInit;