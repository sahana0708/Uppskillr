# Uppskillr LMS - Troubleshooting Guide

Common issues and their solutions.

---

## Installation Issues

### Issue: "npm install fails"

**Symptoms:**
- Error installing dependencies
- Permission errors

**Solutions:**

1. **Clear npm cache:**
```bash
npm cache clean --force
```

2. **Delete node_modules and reinstall:**
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

3. **Use elevated permissions (if needed):**
```bash
# Windows PowerShell (Run as Administrator)
npm install --force
```

---

### Issue: "MySQL connection failed"

**Symptoms:**
- `Can't connect to MySQL server`
- `Access denied for user 'root'@'localhost'`

**Solutions:**

1. **Check if MySQL is running:**
```powershell
# Windows
Get-Service MySQL*

# If not running, start it:
Start-Service MySQL80
```

2. **Verify credentials:**
Check `backend/.env`:
```
DATABASE_URL="mysql://root:Shravya@localhost:3306/lms_db"
```

3. **Test MySQL connection:**
```bash
mysql -u root -pShravya
```

4. **Create database manually:**
```sql
CREATE DATABASE lms_db;
EXIT;
```

5. **Reset MySQL password (if needed):**
```bash
# Stop MySQL
net stop MySQL80

# Start with skip-grant-tables
mysqld --skip-grant-tables

# In another terminal:
mysql -u root
USE mysql;
UPDATE user SET authentication_string=PASSWORD('Shravya') WHERE User='root';
FLUSH PRIVILEGES;
EXIT;

# Restart MySQL normally
net start MySQL80
```

---

### Issue: "Prisma migration fails"

**Symptoms:**
- `Error: P1001: Can't reach database server`
- `Error: P1005: Database already exists`

**Solutions:**

1. **Database doesn't exist:**
```bash
# Create it first
mysql -u root -pShravya -e "CREATE DATABASE lms_db;"
```

2. **Migration already applied:**
```bash
# Reset migrations
cd backend
npx prisma migrate reset
npx prisma migrate dev
```

3. **Schema drift detected:**
```bash
# Fix schema drift
npx prisma db pull
npx prisma generate
```

4. **Force reset (WARNING: Deletes all data):**
```bash
cd backend
npx prisma migrate reset --force
npx prisma db seed
```

---

### Issue: "Prisma client not generated"

**Symptoms:**
- `Cannot find module '.prisma/client'`
- TypeScript errors about Prisma types

**Solutions:**

```bash
cd backend

# Regenerate client
npx prisma generate

# If that fails, delete cached version
rm -rf node_modules/.prisma
npx prisma generate
```

---

## Backend Issues

### Issue: "Port 5000 already in use"

**Symptoms:**
- `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions:**

1. **Find and kill process:**
```powershell
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

2. **Or change port:**
Edit `backend/.env`:
```
PORT=5001
```
Then update `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

---

### Issue: "CORS errors"

**Symptoms:**
- `Access to fetch at '...' has been blocked by CORS policy`

**Solutions:**

1. **Check backend CORS config in `backend/src/app.ts`:**
```typescript
app.use(
  cors({
    origin: env.FRONTEND_URL, // Should be http://localhost:3000
    credentials: true,
  })
);
```

2. **Verify FRONTEND_URL in `.env`:**
```
FRONTEND_URL=http://localhost:3000
```

3. **Restart backend after changes**

---

### Issue: "JWT token invalid"

**Symptoms:**
- `Invalid token` errors on protected routes
- Constant logouts

**Solutions:**

1. **Clear localStorage:**
```javascript
// In browser console
localStorage.clear();
```

2. **Check JWT_SECRET in `.env`:**
```
JWT_SECRET=uppskillr-super-secret-jwt-key-2024
```

3. **Re-login to get fresh tokens**

---

## Frontend Issues

### Issue: "Port 3000 already in use"

**Symptoms:**
- `Error: listen EADDRINUSE: address already in use :::3000`

**Solutions:**

1. **Kill process:**
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

2. **Or change port:**
Edit `frontend/package.json`:
```json
"dev": "next dev -p 3001"
```

---

### Issue: "Module not found"

**Symptoms:**
- `Module not found: Can't resolve 'react-youtube'`
- Similar errors for other packages

**Solutions:**

```bash
cd frontend

# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

### Issue: "API calls fail"

**Symptoms:**
- Network errors in browser console
- `Request failed with status code 500`

**Solutions:**

1. **Check if backend is running:**
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"ok"}
```

2. **Verify API URL in `.env.local`:**
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

3. **Check browser network tab for details**

4. **Ensure CORS is configured (see backend CORS issues)**

---

### Issue: "YouTube player not loading"

**Symptoms:**
- Video player shows black screen
- YouTube errors in console

**Solutions:**

1. **Check YouTube URL format in database:**
Should be: `https://www.youtube.com/watch?v=VIDEO_ID`

2. **Verify video ID extraction in code:**
```typescript
const youtubeId = video.youtubeUrl.split('v=')[1]?.split('&')[0] || '';
```

3. **Test YouTube URL directly in browser**

4. **Some videos may have embedding restrictions**

---

## Authentication Issues

### Issue: "Cannot login"

**Symptoms:**
- `Invalid credentials` error
- Login form doesn't submit

**Solutions:**

1. **Verify user exists in database:**
```bash
cd backend
npx prisma studio
# Check users table
```

2. **Reset password:**
```typescript
// In Node.js REPL or script:
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash('newpassword', 10);
// Update user's passwordHash in database
```

3. **Create new test user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test\",\"email\":\"test@test.com\",\"password\":\"test123\"}"
```

---

### Issue: "Constant token refresh loops"

**Symptoms:**
- Endless redirect between pages
- Multiple refresh requests

**Solutions:**

1. **Clear everything:**
```javascript
// Browser console
localStorage.clear();
document.cookie.split(";").forEach(c => document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"));
location.reload();
```

2. **Re-login fresh**

3. **Check refresh token expiry in database:**
```bash
npx prisma studio
# Check refreshToken.expiresAt
```

---

## Video Progress Issues

### Issue: "Progress not saving"

**Symptoms:**
- Video always starts from beginning
- Progress stays at 0

**Solutions:**

1. **Check if logged in:**
Progress only saves for authenticated users

2. **Verify progress endpoint:**
```bash
curl http://localhost:5000/api/progress/videos/VIDEO_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

3. **Check browser console for errors**

4. **Verify video exists in database**

---

### Issue: "Videos remain locked"

**Symptoms:**
- All videos show lock icon
- Cannot click on any video

**Solutions:**

1. **Complete previous video:**
Watch at least 90% of the previous video

2. **First video should always be unlocked**

3. **Check completion in database:**
```bash
npx prisma studio
# Check videoProgress table for isCompleted=true
```

4. **Manually mark as complete (for testing):**
Update `videoProgress` record:
```sql
UPDATE video_progress 
SET is_completed = true, completed_at = NOW() 
WHERE user_id = 'YOUR_USER_ID' AND video_id = 'PREVIOUS_VIDEO_ID';
```

---

## Performance Issues

### Issue: "Slow page loads"

**Symptoms:**
- Pages take long to load
- Spinner shows for extended time

**Solutions:**

1. **Check database query performance:**
```bash
# Enable Prisma query logging
# In .env add:
LOG_LEVEL=debug
```

2. **Add database indexes:**
Already included in schema for foreign keys

3. **Clear browser cache**

4. **Check network tab for slow requests**

---

### Issue: "Memory leaks"

**Symptoms:**
- App gets slower over time
- High memory usage

**Solutions:**

1. **Restart development servers**

2. **Clear intervals in useEffect:**
Already implemented with cleanup functions

3. **Check for unclosed connections**

---

## Build Issues

### Issue: "TypeScript errors"

**Symptoms:**
- Type errors during build
- `Property 'user' does not exist on type 'Request'`

**Solutions:**

```bash
cd backend

# Regenerate types
npx prisma generate

# Clear TypeScript cache
rm -rf dist
npm run build
```

---

### Issue: "Next.js build fails"

**Symptoms:**
- `Build failed because of webpack errors`

**Solutions:**

```bash
cd frontend

# Clear cache
rm -rf .next node_modules

# Reinstall and rebuild
npm install
npm run build
```

---

## Common Error Messages

### "User already registered"
**Cause:** Email already exists in database  
**Solution:** Use different email or delete existing user

### "Video not found"
**Cause:** Invalid video ID  
**Solution:** Verify video exists and URL is correct

### "No token provided"
**Cause:** Not logged in or token expired  
**Solution:** Login again

### "Refresh token expired"
**Cause:** Refresh token older than 30 days  
**Solution:** Login again to get new tokens

### "Database error occurred"
**Cause:** Various database issues  
**Solution:** Check detailed logs, verify connection

---

## Debugging Tips

### Enable Detailed Logging

**Backend:**
```bash
# Add to .env
DEBUG=*
LOG_LEVEL=debug
```

**Frontend:**
```javascript
// Add console.log statements
// Check browser DevTools Console
```

### Use Prisma Studio

```bash
cd backend
npx prisma studio
# Opens GUI at http://localhost:5555
```

### Test API Endpoints

```bash
# Health check
curl http://localhost:5000/api/health

# Get subjects
curl http://localhost:5000/api/subjects

# With auth
curl http://localhost:5000/api/users/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Check Server Logs

**Backend logs:**
- Look for errors in terminal running backend
- Check for database connection messages
- Watch for CORS configuration

**Frontend logs:**
- Browser DevTools Console
- Next.js terminal output
- Network tab for failed requests

---

## Still Having Issues?

1. **Verify all prerequisites:**
   - Node.js 18+
   - MySQL 8.0 running
   - npm or yarn installed

2. **Start fresh:**
   ```bash
   # Delete everything and reinstall
   rm -rf backend/node_modules backend/.next
   rm -rf frontend/node_modules frontend/.next
   
   cd backend
   npm install
   npx prisma generate
   npx prisma migrate reset
   npx prisma db seed
   
   cd ../frontend
   npm install
   ```

3. **Check system requirements:**
   - Sufficient RAM (4GB+ recommended)
   - Available disk space
   - No firewall blocking ports 3000/5000

4. **Review all documentation:**
   - README.md
   - QUICKSTART.md
   - API.md
   - This file

---

## Getting Help

When asking for help, include:

1. **Error message** (exact text)
2. **What you were trying to do**
3. **Steps to reproduce**
4. **Your environment:**
   - Node.js version
   - MySQL version
   - Operating System
5. **Relevant logs**

---

**Most issues can be resolved by:**
- Restarting servers
- Clearing caches
- Verifying database connection
- Checking environment variables
- Reviewing error logs carefully

Good luck! 🚀
