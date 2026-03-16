# Uppskillr LMS - Quick Backend Deployment Guide

## 🚀 Deploy Backend to Railway (Easiest Method)

### Option 1: One-Click Deploy
**Click here**: https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2Fsahana0708%2FUppskillr&rootDirectory=backend

This will automatically:
- Create a Railway project
- Connect your GitHub repository
- Set up the backend service

### Option 2: Manual Setup (Step-by-Step)

#### 1. Sign Up & Create Project
```
1. Go to https://railway.app
2. Click "Login" → "Sign in with GitHub"
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose repository: sahana0708/Uppskillr
6. Select the `backend` folder
```

#### 2. Add MySQL Database
```
1. In Railway dashboard, click "+ New"
2. Select "Database" → "MySQL"
3. Wait for provisioning (takes ~30 seconds)
```

#### 3. Configure Environment Variables
In Railway dashboard → Variables tab, add:

| Variable Name | Value |
|--------------|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `DATABASE_URL` | (Auto-filled by Railway MySQL) |
| `JWT_SECRET` | `uppskillr-super-secret-key-2024-change-in-production` |
| `JWT_EXPIRES_IN` | `15m` |
| `REFRESH_TOKEN_EXPIRES_IN` | `30d` |
| `FRONTEND_URL` | `https://uppskillr-lms.vercel.app` |

#### 4. Deploy & Run Migrations
```bash
# In Railway dashboard, open DevTools/Shell
npx prisma migrate deploy
npm run db:seed
```

#### 5. Get Your Backend URL
After deployment completes, copy the URL from:
Railway Dashboard → Settings → Domains → *.up.railway.app

Example: `https://your-project-name.up.railway.app`

---

## 🔗 Connect Frontend to Backend

### Update Vercel Environment Variables

1. Go to Vercel Dashboard → uppskillr-lms → Settings → Environment Variables
2. Add these variables:

| Variable Name | Value |
|--------------|-------|
| `NEXT_PUBLIC_API_URL` | `https://your-backend-url.up.railway.app/api` |
| `NEXT_PUBLIC_BACKEND_URL` | `https://your-backend-url.up.railway.app` |

3. Click "Save"
4. Redeploy the frontend (Vercel will auto-redeploy when you push or manually trigger)

---

## ✅ Verify Deployment

Test your full-stack app:
1. Visit: https://uppskillr-lms.vercel.app
2. Register a new account
3. Login with credentials
4. Browse courses
5. Test the ChatBot

---

## 🆘 Troubleshooting

### Backend won't start
- Check Railway logs in the Dashboard
- Verify DATABASE_URL is correct
- Ensure all environment variables are set

### Database errors
- Run migrations: `npx prisma migrate deploy`
- Seed database: `npm run db:seed`

### CORS errors
- Make sure FRONTEND_URL is set correctly in Railway
- Verify NEXT_PUBLIC_API_URL in Vercel

---

## 📊 Cost Estimate

**Railway**: 
- Free tier: $5/month credit (sufficient for development)
- Pay-as-you-go after that (~$5-10/month for small apps)

**Vercel**: 
- Free for personal projects ✅

**Total**: ~$5-10/month or FREE if staying within Railway's free tier
