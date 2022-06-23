const DBManager = require("./dbManager");
const path = require('path');
const crypto = require('./crypto');

const database = new DBManager(path.join(__dirname, "database.json"));

// Initializer
async function databaseInit(masterPassword) {
    try {
        await database.read();
        const {posts} = database.data;

        // Generate random Key (SK2)
        posts["SK2"] = crypto.genRandomKey(masterPassword.length);

        // Secret key
        const secretKey = masterPassword + posts["SK2"]

        // Generate Encrypted Master Password (Encrypted SK1)
        const encryptedSK1 = crypto.encrypt(masterPassword, secretKey);
        posts[encryptedSK1] = {};

        await database.write();
    } catch (error) {
        console.log("Error at databaseInit.");
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
    } catch(error) {
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
