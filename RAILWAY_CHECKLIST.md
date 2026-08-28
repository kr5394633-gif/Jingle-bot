# Railway Deployment Checklist for Xytrix Bot

## ✅ Pre-Deployment (Complete these FIRST)

### 1. Security - Move Credentials OUT of config.json
- [ ] Remove sensitive data from `config.json` OR create `.env` file locally
- [ ] Ensure `config.json` is in `.gitignore` (already configured)
- [ ] Copy `config.json` values to Railway environment variables

### 2. GitHub Setup
- [ ] Create GitHub repository
- [ ] Initialize git: `git init`
- [ ] Add all files: `git add .`
- [ ] Commit: `git commit -m "Initial commit"`
- [ ] Push to GitHub: `git push -u origin main`

### 3. Verify Project Structure
- [ ] ✅ Procfile created
- [ ] ✅ .gitignore configured
- [ ] ✅ .env.example created
- [ ] ✅ package.json has "start" script
- [ ] ✅ node version >= 20.0.0

## 🚀 Railway Deployment Steps

### 4. Create Railway Account
- [ ] Go to https://railway.app
- [ ] Sign up with GitHub account

### 5. Create New Project
- [ ] Click "New Project"
- [ ] Select "Deploy from GitHub repo"
- [ ] Authorize Railway app
- [ ] Select your `Jingle-main` repository
- [ ] Wait for build (5-10 minutes)

### 6. Configure Environment Variables (CRITICAL)
In Railway Dashboard → Your Project → Variables:

```
TOKEN                = [Your Discord Bot Token]
MONGO_DB             = [Your MongoDB Atlas URI]
MONGO_DB1            = [Your Secondary MongoDB URI]
NODE_ENV             = production
COOLDOWN             = true
BOSS                 = 1090621839061033010,1527609131043917874,458651863668228096
ADMIN                = 1090621839061033010,1527609131043917874,458651863668228096
PREM                 = 1090621839061033010,1527609131043917874,327878682314014721
NP                   = 1090621839061033010,1527609131043917874,419611173000970260
INVITE               = https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID
```

### 7. Monitor Deployment
- [ ] Watch logs in Railway dashboard
- [ ] Check for any errors during startup
- [ ] Verify bot comes online in Discord

### 8. Enable Auto-Deploy (Optional but Recommended)
- [ ] Railway → Project Settings
- [ ] Enable "Auto-deploy" on push
- [ ] Now every time you push to GitHub, Railway will auto-redeploy

## 🔧 Troubleshooting

### Bot not starting?
1. Check Railway logs for error messages
2. Verify TOKEN is correct and bot has permissions
3. Ensure MongoDB connection string is valid

### Connection to MongoDB failing?
1. Check MongoDB Atlas whitelist allows Railway IPs
2. Try: MongoDB → Network Access → Allow from anywhere (0.0.0.0/0)
3. Verify connection string includes username:password@

### Still having issues?
1. Check Railway logs: `railway logs`
2. Verify environment variables are all set
3. Test locally with `.env` file before deploying

## 📊 Railway Pricing (Free Tier)
- ✅ Always-on deployment (24/7)
- ✅ $5 monthly free credit
- ✅ Automatic restarts on crash
- ✅ GitHub integration with auto-deploy
- ✅ 500MB free disk space
- Usage beyond free tier is very affordable

## 🎯 Next Steps After Deployment
1. Verify bot is online in Discord
2. Test bot commands
3. Monitor Railway logs for any issues
4. Set up GitHub webhooks for auto-deploy (optional)

---
**Need help?** Check [Railway Docs](https://docs.railway.app) or [Discord.js Guide](https://discordjs.guide)
