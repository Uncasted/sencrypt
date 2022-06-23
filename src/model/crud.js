const DBManager = require("./dbManager");
const database = new DBManager("./src/model/database.json");

// Basic CRUD Operations.
async function createAccount(username, password) {
    await database.read();
    const {posts} = database.data;

    posts[username] = password;
    await database.write();
}

async function getAccount(username) {
    await database.read();
    const {posts} = database.data;

    // Get the password from the posts object.
    const password = posts[username];
    return [username, password];
}

async function updateUsername(oldUsername, newUsername) {
    await database.read();
    const {posts} = database.data;

    // Give the password to the new username.
    posts[newUsername] = posts[oldUsername];
    delete posts[oldUsername];
    await database.write();
}

async function updatePassword(username, newPassword) {
    await database.read();
    const {posts} = database.data;

    posts[username] = newPassword;
    await database.write();
}

async function deleteAccount(username) {
    await database.read();
    const {posts} = database.data;

    delete posts[username];
    await database.write();
}
