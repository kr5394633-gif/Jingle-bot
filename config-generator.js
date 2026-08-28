#!/usr/bin/env node
/**
 * Generate config.json from environment variables
 * This runs before the bot starts, especially useful on Railway
 */

const fs = require('fs');
const path = require('path');

// Default config template
const defaultConfig = {
    TOKEN: process.env.TOKEN || '',
    MONGO_DB: process.env.MONGO_DB || '',
    MONGO_DB1: process.env.MONGO_DB1 || '',
    cooldown: process.env.COOLDOWN === 'true' ? true : true,
    boss: (process.env.BOSS || '').split(',').filter(Boolean),
    admin: (process.env.ADMIN || '').split(',').filter(Boolean),
    prem: (process.env.PREM || '').split(',').filter(Boolean),
    np: (process.env.NP || '').split(',').filter(Boolean),
    prefix: process.env.PREFIX || '%',
    invite: process.env.INVITE || ''
};

const configPath = path.join(process.cwd(), 'config.json');

// Only create if doesn't exist
if (!fs.existsSync(configPath)) {
    try {
        fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 4));
        console.log('✅ config.json generated from environment variables');
    } catch (error) {
        console.error('❌ Failed to generate config.json:', error.message);
        process.exit(1);
    }
}
