const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require('mongoose');
const connStr = "mongodb+srv://kenythata_db_user:T94NuyZ6iIykKjGN@cluster0.omnkogx.mongodb.net/";
console.log('Testing connection...');
mongoose.connect(connStr, { serverSelectionTimeoutMS: 5000 })
    .then(() => { console.log('SUCCESS: MongoDB connected!'); process.exit(0); })
    .catch(err => { console.error('FAILED:', err.message); process.exit(1); });
