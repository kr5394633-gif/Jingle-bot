const { QuickDB } = require('quick.db');

class MockQuickMongo {
    constructor(uri) {
        // We initialize the quick.db instance locally in db.sqlite
        this.db = new QuickDB({ filePath: `${process.cwd()}/db.sqlite` });
    }

    async connect() {
        // No-op since SQLite connects instantly
        return true;
    }

    async get(key) {
        return this.db.get(key);
    }

    async set(key, value) {
        return this.db.set(key, value);
    }

    async delete(key) {
        return this.db.delete(key);
    }

    async all() {
        return this.db.all();
    }
}

module.exports = {
    Database: MockQuickMongo
};
