# Xytrix Discord Bot - Railway Deployment Guide

## Prerequisites
- GitHub account with this repository pushed
- Railway.app account (free tier available)
- Discord bot token
- MongoDB Atlas cluster URI

## Deployment Steps

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Jingle-main.git
git push -u origin main
```

### 2. Create Railway Project
1. Go to [Railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize and select your repository
5. Railway will automatically detect Node.js and create a deployment

### 3. Configure Environment Variables
In Railway Dashboard:
1. Go to your project → Variables
2. Add the following environment variables:
   - `TOKEN`: Your Discord bot token
   - `MONGO_DB`: Your MongoDB connection string
   - `MONGO_DB1`: Your secondary MongoDB connection string (if needed)
   - `NODE_ENV`: Set to `production`

### 4. Settings
- **Build Command**: Leave empty (auto-detected)
- **Start Command**: `node index.js`
- **Port**: Not needed for Discord bot (it's not a web server)

### 5. Deployment
- Railway will automatically deploy when you push to main branch
- Monitor logs in Railway dashboard

## Important Security Notes
⚠️ **NEVER commit sensitive credentials to GitHub!**
- Remove or move `config.json` credentials to Railway environment variables
- Update `index.js` to read from environment variables instead of `config.json`

## Current Status
- ✅ Procfile created
- ✅ .env.example created
- ✅ .gitignore configured
- ⚠️ TODO: Update config.json to use environment variables
- ⚠️ TODO: Push to GitHub
- ⚠️ TODO: Connect Railway to GitHub repo

## For 24/7 Uptime
Railway's free tier provides:
- Always-on deployment
- Automatic restarts on crash
- Continuous integration/deployment

No additional configuration needed for 24/7 uptime on Railway!
