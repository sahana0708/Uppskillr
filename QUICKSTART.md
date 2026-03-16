# Uppskillr LMS - Quick Start Guide

## Get Started in 5 Minutes

### Step 1: Verify Prerequisites

```bash
# Check Node.js version (should be 18+)
node --version

# Check if MySQL is running
mysql --version
```

### Step 2: Setup Database

Open MySQL and run:

```sql
CREATE DATABASE lms_db;
EXIT;
```

### Step 3: Install and Start Backend

Open PowerShell/Terminal:

```powershell
# Navigate to backend
cd "C:\Users\sahan\OneDrive\Desktop\Uppskillr LMS\backend"

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations and seed data
npx prisma migrate dev --name init

# Seed database
npx prisma db seed

# Start backend server
npm run dev
```

You should see:
```
✅ Database connected successfully
🚀 Server running on http://localhost:5000
```

### Step 4: Install and Start Frontend

Open a NEW terminal window:

```powershell
# Navigate to frontend
cd "C:\Users\sahan\OneDrive\Desktop\Uppskillr LMS\frontend"

# Install dependencies
npm install

# Start frontend server
npm run dev
```

You should see:
```
ready - started server on 0.0.0.0:3000
```

### Step 5: Open the Application

Visit: **http://localhost:3000**

## First Time User Flow

1. **Sign Up**: Click "Sign Up" and create an account
   - Name: Your name
   - Email: Any email
   - Password: Min 6 characters

2. **Login**: Use your credentials to login

3. **Browse Courses**: Click "Browse Courses" to see available subjects

4. **Start Learning**: 
   - Click on "Python Programming" or any course
   - Click on the first video to start watching
   - Progress saves automatically

5. **Track Progress**: Visit "My Learning" to see your progress

## Testing Features

### Test Registration & Login ✅
- Register a new account
- Login with credentials
- JWT tokens stored in localStorage

### Test Video Playback ✅
- Click on a subject
- Watch the first video (unlocked)
- Progress saves every 10 seconds

### Test Sequential Unlocking ✅
- Complete first video (watch 90%)
- Second video automatically unlocks
- Lock icons show for locked videos

### Test Progress Tracking ✅
- Watch a video partially
- Refresh page - resumes from same position
- Complete video shows checkmark

## Common Issues & Solutions

### Issue: "Cannot connect to database"
**Solution**: 
```bash
# Make sure MySQL is running
# Windows: Check Services or run:
net start MySQL80

# Verify credentials in backend/.env
DATABASE_URL="mysql://root:Shravya@localhost:3306/lms_db"
```

### Issue: "Module not found"
**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: "Prisma errors"
**Solution**:
```bash
cd backend
npx prisma generate
npx prisma migrate dev
```

### Issue: "Port already in use"
**Solution**:
- Close other applications using ports 3000 or 5000
- Or change ports in .env files

## Verification Checklist

Run through these to ensure everything works:

- [ ] Backend starts without errors on port 5000
- [ ] Frontend starts without errors on port 3000
- [ ] Can access homepage at http://localhost:3000
- [ ] Can register new account
- [ ] Can login with credentials
- [ ] Can see subjects list
- [ ] Can click on a subject
- [ ] Can play first video
- [ ] Progress saves automatically
- [ ] Next video unlocks after completion
- [ ] Can see profile/progress page

## Sample Test Account

Create a test account:
- Email: test@example.com
- Password: test123

## Next Steps

1. Explore all three courses
2. Try watching videos on different devices (responsive)
3. Check progress tracking on profile page
4. Test logout and re-login
5. Verify progress persists

## Support Commands

### Backend Health Check
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"ok"}
```

### View Database
```bash
cd backend
npx prisma studio
# Opens database GUI at http://localhost:5555
```

### Reset Database
```bash
cd backend
npx prisma migrate reset
npx prisma db seed
```

## Success Indicators ✨

When everything is working correctly, you'll see:

1. ✅ Modern landing page with gradient hero section
2. ✅ Professional login/register forms
3. ✅ Course cards with thumbnails
4. ✅ Video player with YouTube integration
5. ✅ Lock icons on locked videos
6. ✅ Checkmarks on completed videos
7. ✅ Progress bars showing completion
8. ✅ Responsive design on mobile/tablet

---

**Need Help?** Check the main README.md for detailed documentation!
