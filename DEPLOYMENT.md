# Uppskillr LMS - Deployment Guide

## Frontend (Vercel) ✅

**Status**: Deployed
- **URL**: https://uppskillr-lms.vercel.app
- **Platform**: Vercel
- **Framework**: Next.js 14

## Backend (Railway) - Setup Instructions

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with your GitHub account
3. Create a new project

### Step 2: Deploy Backend to Railway
1. Click "New Project" → "Deploy from GitHub repo"
2. Select repository: `sahana0708/Uppskillr`
3. Choose the `backend` folder as the root
4. Railway will auto-detect Node.js

### Step 3: Add MySQL Database
1. In your Railway project, click "New" → "Database" → "MySQL"
2. Wait for MySQL to provision
3. Copy the `DATABASE_URL` connection string

### Step 4: Configure Environment Variables
In Railway dashboard, add these environment variables:

```bash
NODE_ENV=production
PORT=5000
DATABASE_URL=mysql://root:password@mysql.railway.internal:3306/railway
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=30d
FRONTEND_URL=https://uppskillr-lms.vercel.app
```

### Step 5: Run Database Migrations
After deployment, connect to Railway's shell and run:
```bash
npx prisma migrate deploy
npm run db:seed
```

### Step 6: Update Frontend
Once backend is deployed, update Vercel environment variables:

```bash
NEXT_PUBLIC_API_URL=https://your-backend-url.up.railway.app/api
NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.up.railway.app
```

Then redeploy frontend on Vercel.

---

## Alternative: Deploy Backend on Render

1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repository
4. Root Directory: `backend`
5. Build Command: `npm install && npm run build`
6. Start Command: `npm start`
7. Add MySQL database from Render's database services
8. Configure environment variables (same as above)

---

## Testing

After both deployments are complete:
1. Visit https://uppskillr-lms.vercel.app
2. Test user registration
3. Test login functionality
4. Verify course data loads correctly
5. Test ChatBot functionality
