/**
 * Global Config Loader
 * This module handles config loading with fallback to environment variables
 * Used by all commands and events to access configuration
 */

const fs = require('fs');
const path = require('path');

let configCache = null;

function loadConfig() {
    if (configCache) return configCache;
    
    const configPath = path.join(process.cwd(), 'config.json');
    
    // Try to load from file first
    if (fs.existsSync(configPath)) {
        try {
            configCache = require(configPath);
            return configCache;
        } catch (err) {
            console.warn('Failed to parse config.json, using environment variables:', err.message);
        }
    }
    
    // Fallback to environment variables
    configCache = {
        TOKEN: process.env.TOKEN || '',
        MONGO_DB: process.env.MONGO_DB || '',
        MONGO_DB1: process.env.MONGO_DB1 || '',
        cooldown: process.env.COOLDOWN !== 'false',
        boss: (process.env.BOSS || '').split(',').filter(Boolean).map(id => id.trim()),
        admin: (process.env.ADMIN || '').split(',').filter(Boolean).map(id => id.trim()),
        prem: (process.env.PREM || '').split(',').filter(Boolean).map(id => id.trim()),
        np: (process.env.NP || '').split(',').filter(Boolean).map(id => id.trim()),
        prefix: process.env.PREFIX || '%',
        invite: process.env.INVITE || ''
    };
    
    return configCache;
}

module.exports = loadConfig();
