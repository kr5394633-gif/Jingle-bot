const { Client, Collection, Intents, WebhookClient, ShardClientUtil } = require('discord.js');
const fs = require('fs');
const mongoose = require('mongoose');
const Utils = require('./util');
const { Database } = require('quickmongo');
const axios = require('axios');
const Sweepers = require('./Sweepers');
const { QuickDB } = require('quick.db');

module.exports = class Xytrix extends Client {
    constructor() {
        super({
            intents: 3276543,
            fetchAllMembers: false,
            shards: 'auto',
            disableEveryone: true,
            allowedMentions: {
                parse: ['users'], 
            }
        });

        try {
            this.config = require(`${process.cwd()}/config.json`);
        } catch (e) {
            this.config = {};
        }

        // Support environment variables override
        this.config.TOKEN = process.env.TOKEN || process.env.BOT_TOKEN_1 || this.config.TOKEN;
        this.config.MONGO_DB = process.env.MONGO_DB || this.config.MONGO_DB;
        this.config.MONGO_DB1 = process.env.MONGO_DB1 || this.config.MONGO_DB1;
        this.config.cooldown = process.env.COOLDOWN !== undefined ? (process.env.COOLDOWN === 'true') : (this.config.cooldown !== undefined ? this.config.cooldown : true);
        
        const parseArray = (envVar, fallback) => {
            if (envVar) return envVar.split(',').map(id => id.trim());
            return fallback || [];
        };
        this.config.boss = parseArray(process.env.BOSS, this.config.boss);
        this.config.admin = parseArray(process.env.ADMIN, this.config.admin);
        this.config.prem = parseArray(process.env.PREM, this.config.prem);
        this.config.np = parseArray(process.env.NP, this.config.np);
        this.config.invite = process.env.INVITE || this.config.invite;
        this.logger = require('./logger');
        this.commands = new Collection();
        this.categories = fs.readdirSync('./commands/');
        this.emoji = {
            tick: '<:Xytrix_yes:1430998886494896240>',
            cross: '<:Xytrix_no:1430998925308858369>',
            dot: '<a:Xytrix_dot:1431006158549684247>'
        };
        this.util = new Utils(this);
        this.Sweeper = new Sweepers(this);
        this.color = `0x000000`;
        this.support = `https://discord.gg/coredev`;
        this.cooldowns = new Collection();
        this.snek = require('axios');
        this.ratelimit = new WebhookClient({
            url: 'https://discord.com/api/webhooks/1435683759402778839/fzp6kclcbFtTLlgQvTAC1ZbsTZzAumvaDY5kg_C5ActapHcm0KMxXhMl6ZC1S9NpClPF'
        });
        this.error = new WebhookClient({
            url: 'https://discord.com/api/webhooks/1435684079461990400/qpbbyfMthegP35qzirieycS7bR20_n0wlHgKuS0-Bdd62YQ5Js2mGqy8-jFu7ds0GeYB'
        });
        
        this.errorHandling();
        this.rateLimitHandling();
    }

    // shardConfig() {
    //     const totalShards = this.shard?.count ?? 1;
    //     this.totalClusters = totalShards * 5;
        
    //     this.clusters = Array.from({ length: totalShards }, (_, shardIndex) => ({
    //         id: shardIndex,
    //         clusters: Array.from({ length: 5 }, (_, clusterIndex) => {
    //             const clusterId = shardIndex * 5 + clusterIndex;
    //             return {
    //                 id: clusterId,
    //                 servers: []
    //             };
    //         }).filter(cluster => cluster.id < this.totalClusters)
    //     }));
    //     this.on('ready', () => {
    //         this.guilds.cache.forEach(guild => {
    //             const shardId = guild.shardId;
    //             const clusterIndex = guild.id % 5;
    //             const cluster = this.clusters.find(c => c.id === shardId);
    //             if (cluster) {
    //                 cluster.clusters[clusterIndex].servers.push(guild.id);
    //             }
    //         });
    
    //         this.logger.log(`Total Shards: ${totalShards}, Total Clusters: ${this.totalClusters}`, 'shard');
    //         this.logger.log(`Cluster configuration: ${JSON.stringify(this.clusters, null, 2)}`, 'shard');
    //     });
    // }
    

    errorHandling() {
        this.on('error', (error) => {
            console.error('Client Error:', error);
            this.error.send(`\`\`\`js\n${error.stack}\`\`\``).catch(() => {});
        });
        process.on('unhandledRejection', (error) => {
            console.error('Unhandled Rejection:', error);
            if (error && error.stack) {
                this.error.send(`\`\`\`js\n${error.stack}\`\`\``).catch(() => {});
            } else {
                this.error.send(`\`\`\`js\n${error}\`\`\``).catch(() => {});
            }
        });
        process.on('uncaughtException', (error) => {
            console.error('Uncaught Exception:', error);
            this.error.send(`\`\`\`js\n${error.stack}\`\`\``).catch(() => {});
        });
        process.on('warning', (warn) => {
            console.warn('Warning:', warn);
            this.error.send(`\`\`\`js\n${warn}\`\`\``).catch(() => {});
        });
        process.on('uncaughtExceptionMonitor', (err, origin) => {
            console.error('Uncaught Exception Monitor:', err, origin);
            this.error.send(`\`\`\`js\n${err},${origin}\`\`\``).catch(() => {});
        });
    }

    rateLimitHandling() {
        this.on('rateLimit', (info) => {
            console.warn('Rate Limit hit:', info);
            let messageContent = `\`\`\`js\nTimeout: ${info.timeout},\nLimit: ${info.limit},\nMethod: ${info.method},\nPath: ${info.path},\nRoute: ${info.route},\nGlobal: ${info.global}\`\`\``;

            if (info.global) {
                messageContent = `@everyone\n${messageContent}`;
            }

            this.ratelimit.send({
                content: messageContent
            }).catch(() => {});
        });
    }

    async initializedata() {
        this.data = new QuickDB();
        this.logger.log(`Connecting to Sql...`);
        this.logger.log('Sql Database Connected', 'ready');
    }

    async initializeSecondMongoose() {
        try {
            this.secondDb = mongoose.createConnection(this.config.MONGO_DB1, {
                serverSelectionTimeoutMS: 20000,
                socketTimeoutMS: 45000,
            });
            this.secondDb.on('error', error => {
                this.logger.log(`Second MongoDB connection error: ${error.message}`, 'error');
            });
            await this.secondDb.asPromise();
            this.logger.log('Second MongoDB Connected', 'ready');
        } catch (error) {
            this.logger.log(`Second MongoDB connection error: ${error.message}`, 'error');
        }
    }

    async initializeMongoose() {
        this.logger.log(`Connecting to MongoDb...`);
        try {
            this.db = new Database(this.config.MONGO_DB);
            await this.db.connect();
            await mongoose.connect(this.config.MONGO_DB, {
                serverSelectionTimeoutMS: 20000,
                socketTimeoutMS: 45000,
            });
            this.logger.log('Mongoose Database Connected', 'ready');
        } catch (error) {
            this.logger.log(`Mongoose connection error: ${error.message}`, 'error');
            throw error;
        }
        await this.initializeSecondMongoose();
    }

    async loadEvents() {
        const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));

        for (const file of eventFiles) {
            try {
                const event = require(`${process.cwd()}/events/${file}`);
                console.log(`Loading event file: ${file}`);
                console.log(`Event type: ${typeof event}`);

                if (typeof event === 'function') {
                    await event(this);
                    this.logger.log(`Loaded Event ${file}.`, 'event');
                } else {
                    console.error(`Event file ${file} does not export a function`);
                }
            } catch (error) {
                console.error(`Error loading event file ${file}:`, error);
            }
        }
    }

    async loadlogs() {
        fs.readdirSync('./logs/').forEach((file) => {
            let logevent = file.split('.')[0];
            require(`${process.cwd()}/logs/${file}`)(this);
            this.logger.log(`Updated Logs ${logevent}.`, 'event');
        });
    }

    async loadMain() {
        const commandFiles = [];
    
        const commandDirectories = fs.readdirSync(`${process.cwd()}/commands`);
    
        for (const directory of commandDirectories) {
            const files = fs
                .readdirSync(`${process.cwd()}/commands/${directory}`)
                .filter((file) => file.endsWith('.js'));
    
            for (const file of files) {
                commandFiles.push(
                    `${process.cwd()}/commands/${directory}/${file}`
                );
            }
        }
    
        commandFiles.map((value) => {
            const file = require(value);
            const splitted = value.split('/');
            const directory = splitted[splitted.length - 2];
            if (file.name) {
                const properties = { directory, ...file };
                this.commands.set(file.name, properties);
            }
        });
    
        const getCommandCounts = () => {
            let actualCommands = 0;
            let totalCommands = 0;
            
            this.commands.forEach(cmd => {
                actualCommands += 1;
                totalCommands += 1; 
                if (cmd.subcommand && Array.isArray(cmd.subcommand)) {
                    totalCommands += cmd.subcommand.length;
                }
            });
    
            return { actualCommands, totalCommands };
        };
    
        const { actualCommands, totalCommands } = getCommandCounts();
        this.logger.log(`Total Commands ${actualCommands} Commands.`, 'cmd');
        this.logger.log(`Updated ${totalCommands} Commands.`, 'cmd');
    }    
}
