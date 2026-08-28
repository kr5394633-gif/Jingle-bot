# Complete Railway Deployment Guide for Jingle Bot

## Prerequisites Checklist
- [ ] GitHub account (https://github.com)
- [ ] Railway account (https://railway.app)
- [ ] Discord Bot Token (from Discord Developer Portal)
- [ ] MongoDB Atlas URI (MongoDB connection string)

## Step 1: Initialize Git Repository and Push to GitHub

```powershell
# Navigate to project directory
cd c:\Users\HP\Downloads\Jingle-main\Jingle-main

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial Jingle bot deployment"

# Set main branch
git branch -M main

# Add remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/Jingle-main.git

# Push to GitHub
git push -u origin main
```

## Step 2: Create Railway Project

1. Go to https://railway.app
2. Sign up or log in with your GitHub account
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Authorize Railway to access your GitHub
6. Select the **"Jingle-main"** repository
7. Wait for Railway to detect Node.js and start building (5-10 minutes)

## Step 3: Configure Environment Variables in Railway Dashboard

Once the project is created in Railway:

1. Go to your Railway project dashboard
2. Click on your deployed service
3. Go to the **"Variables"** tab
4. Add ALL of these environment variables:

```
BOT_TOKEN_1 = your_first_discord_bot_token_here
BOT_TOKEN_2 = your_second_discord_bot_token_here
MONGO_DB = your_mongodb_connection_string
MONGO_DB1 = your_secondary_mongodb_string
BOSS = 1090621839061033010,1527609131043917874,458651863668228096
ADMIN = 1090621839061033010,1527609131043917874,458651863668228096
PREM = 1090621839061033010,1527609131043917874,327878682314014721
NP = 1090621839061033010,1527609131043917874,419611173000970260
COOLDOWN = true
INVITE = https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID
NODE_ENV = production
```

## Step 4: Configure Deploy Settings in Railway

1. Go to the **"Settings"** tab in your Railway project
2. Verify:
   - **Start Command**: `node start-bots.js` (should auto-detect)
   - **Build Command**: Leave empty (auto-detect)
   - **Port**: Not required for Discord bots

## Step 5: Deploy & Monitor

1. Click **"Deploy"** button
2. Monitor logs in the "Logs" tab
3. Bot should go online once deployment completes
4. Check Discord server to confirm bot is online

## Future Deployments

Railway automatically redeploys when you push to your GitHub `main` branch:

```powershell
# Make changes locally
git add .
git commit -m "Your changes here"
git push origin main
# Railway will automatically build and deploy!
```

## Troubleshooting

**Bot not going online:**
- Check all environment variables are set correctly
- Verify Discord bot token is valid
- Check MongoDB connection strings
- Look at Railway logs for error messages

**Build failures:**
- Ensure Node.js version 22.x is compatible
- Check `package.json` dependencies
- Verify all required files are committed to GitHub

**Connection issues:**
- Verify MongoDB Atlas has Railway IP whitelisted (or set to 0.0.0.0)
- Check firewall settings if using custom MongoDB

## Important Security Notes ⚠️

**NEVER expose credentials on GitHub!**
- The `.env` file is in `.gitignore` and won't be pushed
- All sensitive data should ONLY be in Railway's Variables
- Regenerate the Discord token if it was ever exposed

## Railway Benefits for This Bot

✅ 24/7 Uptime - Always running without restart
✅ Auto-Restart - Restarts if it crashes
✅ CI/CD - Auto-deploy on git push
✅ Free Tier - $5/month free credit
✅ Easy Scaling - Simple to add more services

---

**Questions? Check Railway Docs:** https://docs.railway.app
