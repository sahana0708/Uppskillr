# 🚀 Deploy Backend NOW - Click-by-Click Guide

**Follow these EXACT steps - Takes 5 minutes!**

---

## Step 1: Open Railway
👉 **Click here**: https://railway.app

**What to do:**
1. Click "Login" button (top right)
2. Click "Sign in with GitHub"
3. Authorize Railway to access your GitHub (sahana0708)
4. You'll see the Railway dashboard

✅ **Done? Continue below ⬇️**

---

## Step 2: Create New Project from GitHub

**On Railway Dashboard:**
1. Click the big purple button: **"New Project"**
2. Click: **"Deploy from GitHub repo"**
3. You'll see a list of your repositories
4. Find and click: **"sahana0708/Uppskillr"**

✅ **Done? Continue below ⬇️**

---

## Step 3: Select Backend Folder

**Railway will ask for the root directory:**
1. Type: `backend`
2. Or select the backend folder from the file browser
3. Click: **"Deploy"**

⏳ **Wait 30-60 seconds while Railway builds...**

You'll see:
- Build logs scrolling
- "Building..." status
- Then "Deployed" ✅

✅ **Done? Continue below ⬇️**

---

## Step 4: Add MySQL Database

**In your Railway project dashboard:**
1. Click the **"+ New"** button (usually top or left side)
2. Click: **"Database"**
3. Click: **"MySQL"**
4. Wait ~30 seconds for it to provision

You'll see:
- A new MySQL service appear
- Green dot indicating it's running

✅ **Done? Continue below ⬇️**

---

## Step 5: Configure Environment Variables

**In Railway dashboard, click on your backend service:**
1. Go to the **"Variables"** tab
2. Click **"Add Variable"** or **"+ New"**

**Add these variables ONE BY ONE:**

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `JWT_SECRET` | `uppskillr-super-secret-key-2024-change-in-production` |
| `JWT_EXPIRES_IN` | `15m` |
| `REFRESH_TOKEN_EXPIRES_IN` | `30d` |
| `FRONTEND_URL` | `https://uppskillr-lms.vercel.app` |

**For DATABASE_URL:**
1. Click on your MySQL database service
2. Go to "Variables" tab
3. Copy the entire `DATABASE_URL` value
4. Go back to backend service Variables
5. Add new variable: `DATABASE_URL` = paste the MySQL URL

✅ **Done? Continue below ⬇️**

---

## Step 6: Run Database Migrations

**In Railway dashboard:**
1. Click on your backend service
2. Click **"Deployments"** tab
3. Click the **latest deployment**
4. Click **"DevTools"** or **"Shell"** button
5. Wait for shell to connect
6. Type these commands:

```bash
npx prisma migrate deploy
```
(Press Enter, wait for success message)

```bash
npm run db:seed
```
(Press Enter, wait for success message)

✅ **Done? Continue below ⬇️**

---

## Step 7: Get Your Backend URL

**In Railway dashboard:**
1. Click on your backend service
2. Go to **"Settings"** tab
3. Scroll to **"Domains"** section
4. You'll see a URL like: `https://your-project-name.up.railway.app`
5. **Copy this URL** - you'll need it next!

✅ **Done? Continue below ⬇️**

---

## Step 8: Update Frontend on Vercel

**Open a new tab and go to:**
👉 https://vercel.com/dashboard

**Steps:**
1. Click on your project: **"uppskillr-lms"**
2. Click **"Settings"** tab
3. Click **"Environment Variables"** in the left menu
4. Click **"New Variable"** button

**Add these variables:**

| Variable | Value (replace YOUR_URL) |
|----------|-------------------------|
| `NEXT_PUBLIC_API_URL` | `https://YOUR_BACKEND_URL.up.railway.app/api` |
| `NEXT_PUBLIC_BACKEND_URL` | `https://YOUR_BACKEND_URL.up.railway.app` |

5. Click **"Save"** for each variable
6. After saving both, Vercel will automatically redeploy!

⏳ **Wait 2-3 minutes for Vercel to redeploy**

---

## Step 9: Test Your App! 🎉

**Go to:** https://uppskillr-lms.vercel.app

**Try these:**
1. ✅ Click "Register" and create an account
2. ✅ Login with your credentials
3. ✅ Browse courses
4. ✅ Test the ChatBot

---

## 🆘 Troubleshooting

### If Railway build fails:
- Check the build logs for errors
- Make sure you selected the `backend` folder
- Verify package.json exists in backend folder

### If database connection fails:
- Double-check DATABASE_URL is copied correctly
- Ensure MySQL database is running (green dot)

### If frontend doesn't work:
- Make sure you saved Vercel environment variables
- Wait for Vercel deployment to complete
- Clear browser cache and refresh

---

## 💡 Need More Help?

If you get stuck at any step, let me know exactly where and I'll help you troubleshoot!

**You've got this! 🚀**
