# 🚀 Railway Deployment Setup - Complete Instructions

Your Jingle bot code is now on GitHub at: https://github.com/kr5394633-gif/Jingle-bot

## Step 1: Create Railway Account & Connect GitHub

1. Go to https://railway.app
2. Click **Sign up** → Select **Continue with GitHub**
3. Authorize Railway to access your GitHub account
4. Accept the permissions

## Step 2: Create New Railway Project

1. After login, click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Find and select **"Jingle-bot"** repository
4. Railway will automatically start building (this takes 5-10 minutes)

## Step 3: Configure Environment Variables

While Railway is building, add your environment variables:

1. In Railway Dashboard, click on your **Jingle-bot** service
2. Go to the **"Variables"** tab
3. Click **"Raw Editor"** and paste this (replace with YOUR actual values):

```
TOKEN=your_actual_discord_bot_token
MONGO_DB=your_mongodb_atlas_connection_string
MONGO_DB1=your_secondary_mongodb_string
BOSS=1090621839061033010,1527609131043917874,458651863668228096
ADMIN=1090621839061033010,1527609131043917874,458651863668228096
PREM=1090621839061033010,1527609131043917874,327878682314014721
NP=1090621839061033010,1527609131043917874,419611173000970260
COOLDOWN=true
INVITE=https://discord.com/oauth2/authorize?client_id=1324050005467730091
NODE_ENV=production
OPENROUTER_API_KEY=your_openrouter_api_key_if_needed
```

## Step 4: Verify Build Settings

1. Go to **Settings** tab
2. Check that:
   - **Build Command**: Empty or `npm install` (auto-detected)
   - **Start Command**: `node index.js`
   - **Node Version**: 22.x

## Step 5: Deploy

1. Click the **"Deploy"** button on the right
2. Monitor the **"Logs"** tab for any errors
3. Once you see "Successfully started application", your bot is online!

## Step 6: Monitor Bot Status

1. Check **Logs** tab to see if the bot is connecting to Discord
2. Look for messages like:
   - `Startup: initializing MongoDB`
   - `Startup: logging into Discord`
   - `Startup: Discord login complete`

## Future Updates

To update your bot:
```bash
git add .
git commit -m "Your changes"
git push origin main
# Railway automatically deploys the new code!
```

## Troubleshooting

**Bot not going online?**
- Check Logs for error messages
- Verify all environment variables are correct
- Ensure MongoDB connection string is valid
- Check Discord bot token is active

**Build failing?**
- Look for dependency errors in Logs
- Run `npm install` locally to check for issues
- Verify Node.js version matches (22.x)

**MongoDB connection issues?**
- Allow Railway IP in MongoDB Atlas (or set to 0.0.0.0)
- Test connection string locally
- Check credentials in environment variables

## Getting Your Discord Bot Token

1. Go to https://discord.com/developers/applications
2. Create new application or select existing
3. Go to **"Bot"** tab → Click **"Add Bot"**
4. Under TOKEN, click **"Copy"** → Paste into Railway variables as `TOKEN`
5. Go to **OAuth2** → **URL Generator**
6. Select scopes: `bot`
7. Select permissions: `Send Messages`, `Manage Messages`, etc.
8. Copy generated URL → Use to invite bot to your server

## Getting MongoDB Atlas Connection String

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a cluster (free tier available)
3. Go to **"Connect"** → **"Drivers"**
4. Copy connection string
5. Replace `<password>` with your password
6. Paste into Railway as `MONGO_DB` and `MONGO_DB1`

## Need Help?

- Railway Docs: https://docs.railway.app
- Discord.js Docs: https://discord.js.org
- Railway Support: https://railway.app/support

---

**Your bot is now running 24/7 on Railway!** 🎉
