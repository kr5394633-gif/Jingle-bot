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
    boss: (process.env.BOSS || '').split(',').filter(id => id.trim()).map(id => id.trim()),
    admin: (process.env.ADMIN || '').split(',').filter(id => id.trim()).map(id => id.trim()),
    prem: (process.env.PREM || '').split(',').filter(id => id.trim()).map(id => id.trim()),
    np: (process.env.NP || '').split(',').filter(id => id.trim()).map(id => id.trim()),
    prefix: process.env.PREFIX || '%',
    invite: process.env.INVITE || ''
};

const configPath = path.join(process.cwd(), 'config.json');

try {
    // Always write config.json from environment variables (or use existing values)
    let finalConfig = defaultConfig;
    
    // If file exists, use its values as defaults
    if (fs.existsSync(configPath)) {
        try {
            const fileConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            // Merge: env vars override file values
            finalConfig = {
                TOKEN: process.env.TOKEN || fileConfig.TOKEN || '',
                MONGO_DB: process.env.MONGO_DB || fileConfig.MONGO_DB || '',
                MONGO_DB1: process.env.MONGO_DB1 || fileConfig.MONGO_DB1 || '',
                cooldown: fileConfig.cooldown !== undefined ? fileConfig.cooldown : true,
                boss: process.env.BOSS ? defaultConfig.boss : (fileConfig.boss || []),
                admin: process.env.ADMIN ? defaultConfig.admin : (fileConfig.admin || []),
                prem: process.env.PREM ? defaultConfig.prem : (fileConfig.prem || []),
                np: process.env.NP ? defaultConfig.np : (fileConfig.np || []),
                prefix: process.env.PREFIX || fileConfig.prefix || '%',
                invite: process.env.INVITE || fileConfig.invite || ''
            };
        } catch (parseErr) {
            console.warn('Could not parse existing config.json, using environment variables');
        }
    }
    
    fs.writeFileSync(configPath, JSON.stringify(finalConfig, null, 4));
    console.log('✅ config.json generated/updated from environment variables');
} catch (error) {
    console.error('❌ Failed to generate config.json:', error.message);
    process.exit(1);
}
