# Xytrix Discord Bot - Quick Setup Guide

## 🚀 Getting Started

### Step 1: Clone & Install Dependencies
```bash
npm install
```

### Step 2: Create .env File (Local Development)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
- **TOKEN**: Your Discord bot token from [Discord Developer Portal](https://discord.com/developers/applications)
- **MONGO_DB**: Your MongoDB connection string from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Step 3: Run Locally
```bash
npm start
```

## 📋 Getting Your Discord Bot Token

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and name it
3. Go to "Bot" tab → Click "Add Bot"
4. Under TOKEN, click "Copy" (this is your TOKEN)
5. Enable these Intents:
   - Message Content Intent
   - Server Members Intent
   - Guild Presences Intent
6. Go to OAuth2 → URL Generator
7. Select scopes: `bot`
8. Select permissions: `Administrator`
9. Copy the generated URL and open it to invite bot to your server

## 🌐 Setting Up MongoDB

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create database user (remember username & password)
4. Get connection string: Cluster → Connect → Drivers
5. Copy string and replace `<password>` with your password
6. This is your MONGO_DB connection string

## 🚢 Deploying to Railway

See [RAILWAY_CHECKLIST.md](RAILWAY_CHECKLIST.md) for detailed steps.

Quick summary:
1. Push code to GitHub
2. Connect Railway to GitHub
3. Add environment variables in Railway dashboard
4. Deploy! ✅

## ⚠️ Important Security Notes

**NEVER commit your .env file or credentials to GitHub!**

- `.env` is in `.gitignore` - keep it that way
- Only commit `.env.example` (without real credentials)
- Railway environment variables are secure and not committed

## 📞 Support

- Discord.js Documentation: https://discord.js.org
- Railway Documentation: https://docs.railway.app
- MongoDB Atlas Help: https://docs.mongodb.com/atlas

---

Happy coding! 🎉
