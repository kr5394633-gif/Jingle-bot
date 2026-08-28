const { spawn } = require('child_process');

const botTokens = [
    process.env.BOT_TOKEN_1 || process.env.TOKEN,
    process.env.BOT_TOKEN_2
];

if (!botTokens[0] || !botTokens[1]) {
    console.error('Both BOT_TOKEN_1 (or TOKEN) and BOT_TOKEN_2 must be configured.');
    process.exit(1);
}

const children = botTokens.map((token, index) => {
    const botInstance = String(index + 1);
    const child = spawn(process.execPath, ['index.js'], {
        env: {
            ...process.env,
            BOT_INSTANCE: botInstance,
            BOT_TOKEN_1: botInstance === '1' ? token : process.env.BOT_TOKEN_1,
            BOT_TOKEN_2: botInstance === '2' ? token : process.env.BOT_TOKEN_2,
            TOKEN: ''
        },
        stdio: 'inherit'
    });

    child.on('exit', (code, signal) => {
        console.error(`Bot ${botInstance} stopped (${signal || `exit code ${code}`}).`);
        if (code !== 0) process.exitCode = code || 1;
    });

    return child;
});

function stopBots() {
    for (const child of children) {
        if (!child.killed) child.kill('SIGTERM');
    }
}

process.on('SIGINT', stopBots);
process.on('SIGTERM', stopBots);