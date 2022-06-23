const fs = require('fs');

class DBManager {
    constructor(path) {
        this.jsonPath = path;
        this.data = {};
    }

    async read() {
        try {
            const dataString = await fs.promises.readFile(this.jsonPath, 'utf-8');
            this.data = JSON.parse(dataString);
        } catch (error) {
            console.log("Error at read function in DBManager.");
            console.log(error);
        }
    }

    async write() {
        try {
            const dataToWrite = JSON.stringify(this.data);
            await fs.promises.writeFile(this.jsonPath, dataToWrite);
        } catch (error) {
            console.log("Error at write function in DBManager.");
            console.log(error);
        }
    }
}

module.exports = DBManager;