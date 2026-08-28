# Railway Deployment Checklist - Complete Setup

## ✅ Pre-Deployment Complete
- [x] Code pushed to GitHub: https://github.com/kr5394633-gif/Jingle-bot
- [x] All secrets removed from code
- [x] Environment variables configured
- [x] Prefix set to `%`
- [x] Ready for Railway deployment

## 📋 Railway Deployment Steps (Follow in Order)

### Step 1: Sign in to Railway
- Go to https://railway.app
- Click **"Login"**
- Select **"Continue with GitHub"**
- Authorize Railway to access your GitHub account

### Step 2: Create New Project
- After logging in, click **"New Project"** button
- Select **"Deploy from GitHub repo"**
- Find **"kr5394633-gif/Jingle-bot"** and click it
- Railway will start building automatically (wait 5-10 minutes)

### Step 3: Add Environment Variables (CRITICAL)
Once build starts, go to Variables tab and add these (ONE AT A TIME):

**TOKEN** (Your Discord Bot Token)
- Go to https://discord.com/developers/applications
- Select your bot
- Copy token under "Bot" section
- Paste in Railway

**MONGO_DB** (MongoDB Connection String)
- Go to https://mongodb.com/cloud/atlas
- Copy connection string
- Replace `<password>` with actual password
- Paste in Railway

**MONGO_DB1** (Secondary MongoDB - can be same as MONGO_DB)
- Use same string as MONGO_DB or another connection

**BOSS, ADMIN, PREM, NP** (Already set - no change needed)
- Leave as default values

**PREFIX** (Optional - already set to %)
- Leave as `%`

**Other Variables:**
```
COOLDOWN = true
INVITE = https://discord.com/oauth2/authorize?client_id=1324050005467730091
NODE_ENV = production
OPENROUTER_API_KEY = your_api_key_if_using_ai
```

### Step 4: Verify Deploy Settings
- Check **Settings** tab:
  - Start Command: `node index.js`
  - Build Command: (leave empty - auto-detect)
  - Node Version: 22.x

### Step 5: Deploy
- Click **Deploy** button
- Check **Logs** tab for status
- Look for: "Successfully started application"

### Step 6: Verify Bot is Online
- Go to Discord
- Look for your bot in member list
- It should show as online

## 🎯 Quick Reference

**Bot Commands Now Use:** `%help`, `%ping`, `%info` etc.

**Repository URL:** https://github.com/kr5394633-gif/Jingle-bot

**Deployment Link:** https://railway.app

**Need to Update?** Just push to GitHub:
```bash
git add .
git commit -m "changes"
git push origin main
# Railway auto-deploys!
```

## 📞 If Something Goes Wrong

**Bot not appearing online?**
- Check Logs in Railway dashboard
- Verify TOKEN is correct and active
- Ensure no typos in environment variables

**Build failed?**
- Check Logs for error messages
- Ensure all dependencies are correct
- Node.js version might be issue

**Commands not working?**
- Verify PREFIX environment variable
- Check bot has proper permissions in server
- Make sure bot is online (green dot in Discord)

---

**Ready? Start with Step 1 above!** ✨
