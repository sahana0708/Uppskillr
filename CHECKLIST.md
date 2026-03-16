# UPPSKILLR LMS - PRE-FLIGHT CHECKLIST

Complete checklist to ensure everything works perfectly.

---

## ✅ PREREQUISITES CHECK

Before installation, verify these are installed:

### System Requirements
- [ ] **Windows 10/11** (or macOS/Linux equivalent)
- [ ] **Administrator access** (for MySQL service)
- [ ] **4GB+ RAM** available
- [ ] **2GB free disk space**
- [ ] **Stable internet connection** (for npm packages)

### Software Requirements

#### Node.js
- [ ] **Node.js 18+ installed**
  ```bash
  node --version
  # Should show: v18.x.x or higher
  ```

- [ ] **npm installed**
  ```bash
  npm --version
  # Should show: 8.x.x or higher
  ```

#### MySQL
- [ ] **MySQL 8.0 installed**
  ```bash
  mysql --version
  # Should show: mysql  Ver 8.0.x
  ```

- [ ] **MySQL service running**
  ```powershell
  Get-Service MySQL*
  # Status should be "Running"
  ```

- [ ] **Root password is "Shravya"** (or update in .env)
  ```bash
  mysql -u root -pShravya -e "SELECT 1;"
  # Should execute without error
  ```

---

## 📦 INSTALLATION CHECKLIST

### Step 1: Create Database
- [ ] Open MySQL terminal or workbench
- [ ] Run: `CREATE DATABASE lms_db;`
- [ ] Verify: `SHOW DATABASES LIKE 'lms_db';`
- [ ] Exit MySQL

### Step 2: Backend Installation
- [ ] Navigate to backend folder
- [ ] Run: `npm install`
- [ ] Wait for completion (may take 2-5 minutes)
- [ ] Verify no errors in output
- [ ] Check `node_modules` folder exists

### Step 3: Prisma Setup
- [ ] Run: `npx prisma generate`
- [ ] Should see: "✔ Generated Prisma Client"
- [ ] Check `.prisma/client` folder exists

### Step 4: Database Migration
- [ ] Run: `npx prisma migrate dev --name init`
- [ ] Should see: "✔ Successfully applied 1 migration"
- [ ] Verify database has tables:
  ```bash
  mysql -u root -pShravya lms_db -e "SHOW TABLES;"
  # Should list: users, refresh_tokens, subjects, sections, videos, video_progress
  ```

### Step 5: Seed Database
- [ ] Run: `npx prisma db seed`
- [ ] Should see: "✅ Database seeded successfully!"
- [ ] Verify data in database:
  ```bash
  mysql -u root -pShravya lms_db -e "SELECT COUNT(*) FROM subjects;"
  # Should return: 3
  ```

### Step 6: Frontend Installation
- [ ] Navigate to frontend folder
- [ ] Run: `npm install`
- [ ] Wait for completion (may take 3-7 minutes)
- [ ] Verify no errors in output
- [ ] Check `node_modules` folder exists

---

## 🔧 CONFIGURATION CHECKLIST

### Backend Configuration
- [ ] File `backend/.env` exists
- [ ] `DATABASE_URL` is correct
- [ ] `JWT_SECRET` is set
- [ ] `PORT=5000`
- [ ] `FRONTEND_URL=http://localhost:3000`

### Frontend Configuration
- [ ] File `frontend/.env.local` exists
- [ ] `NEXT_PUBLIC_API_URL=http://localhost:5000/api`

---

## ▶️  STARTUP CHECKLIST

### Start Backend
- [ ] Open PowerShell/Terminal
- [ ] Navigate to backend folder
- [ ] Run: `npm run dev`
- [ ] Wait for messages:
  - ✅ "✅ Database connected successfully"
  - 🚀 "🚀 Server running on http://localhost:5000"
- [ ] Keep this terminal open

### Start Frontend
- [ ] Open NEW PowerShell/Terminal
- [ ] Navigate to frontend folder
- [ ] Run: `npm run dev`
- [ ] Wait for message:
  - "ready - started server on 0.0.0.0:3000"
- [ ] Keep this terminal open

### Verify Servers Running
- [ ] Backend terminal shows no errors
- [ ] Frontend terminal shows no errors
- [ ] Both processes still running
- [ ] No port conflict messages

---

## 🌐 BROWSER CHECKLIST

### Test Backend Health
- [ ] Open browser
- [ ] Go to: `http://localhost:5000/api/health`
- [ ] Should show: `{"status":"ok"}`
- [ ] Status code: 200

### Test Frontend
- [ ] Go to: `http://localhost:3000`
- [ ] Homepage loads completely
- [ ] See "Welcome to Uppskillr" heading
- [ ] Gradient hero section visible
- [ ] Navigation bar at top
- [ ] "Browse Courses" section visible

### Visual Checks
- [ ] Uppskillr logo appears
- [ ] Colors are blue/purple gradient
- [ ] Fonts load correctly
- [ ] No broken images
- [ ] Layout looks professional

---

## 👤 FUNCTIONALITY CHECKLIST

### Registration Test
- [ ] Click "Sign Up" button
- [ ] Registration form loads
- [ ] Enter name: "Test User"
- [ ] Enter email: "test@example.com"
- [ ] Enter password: "test123"
- [ ] Enter confirm password: "test123"
- [ ] Click "Create Account"
- [ ] Success redirect to login page
- [ ] No error messages

### Login Test
- [ ] Enter email: "test@example.com"
- [ ] Enter password: "test123"
- [ ] Click "Sign In"
- [ ] Redirect to subjects page
- [ ] Username appears in navbar
- [ ] "Logout" button visible
- [ ] Can see "My Learning" in menu

### Browse Courses Test
- [ ] Click "Browse Courses"
- [ ] See 3 course cards:
  - Python Programming
  - Data Structures & Algorithms
  - Web Development
- [ ] Each card has:
  - [ ] Thumbnail image
  - [ ] Course title
  - [ ] Section count
  - [ ] Description

### Course Content Test
- [ ] Click on "Python Programming"
- [ ] Course detail page loads
- [ ] See sections list
- [ ] First section shows videos
- [ ] First video has play icon (not locked)
- [ ] Second video has lock icon
- [ ] Video titles and descriptions visible

### Video Playback Test
- [ ] Click on first video
- [ ] Video player page loads
- [ ] YouTube video appears
- [ ] Video title and description visible
- [ ] "Back to Course" button present
- [ ] Duration displayed
- [ ] No "Video Locked" message

### Progress Tracking Test
- [ ] Play video for 15+ seconds
- [ ] Pause video
- [ ] Refresh page
- [ ] Video resumes from similar position
- [ ] Watch video to 90%+
- [ ] Complete video
- [ ] Return to course page
- [ ] First video shows checkmark ✓
- [ ] Second video now unlocked (no lock)

### Profile/Test Dashboard
- [ ] Click on username or "My Learning"
- [ ] Profile page loads
- [ ] See statistics cards:
  - Total Videos
  - Completed Videos
  - In Progress Videos
- [ ] Welcome message with your name
- [ ] Progress bars if videos partially watched

### Logout Test
- [ ] Click "Logout" button
- [ ] Redirect to homepage
- [ ] Username no longer in navbar
- [ ] "Login" and "Sign Up" buttons visible
- [ ] Cannot access protected pages

---

## 🔒 SECURITY CHECKLIST

### Authentication
- [ ] Access token stored in localStorage
- [ ] Refresh token in HTTP-only cookie
- [ ] Token auto-refreshes on expiry
- [ ] Protected routes require auth
- [ ] Logout clears all tokens

### Password Security
- [ ] Passwords not visible in network tab
- [ ] Passwords hashed in database
- [ ] Minimum 6 characters enforced

### API Security
- [ ] CORS configured correctly
- [ ] Auth middleware on protected routes
- [ ] Input validation working

---

## 📱 RESPONSIVE DESIGN CHECKLIST

### Desktop (1920x1080)
- [ ] Layout fills screen appropriately
- [ ] Navigation bar complete
- [ ] Course cards in grid (3 columns)
- [ ] Video player full width
- [ ] All text readable

### Tablet (768x1024)
- [ ] Layout adjusts to 2 columns
- [ ] Navigation responsive
- [ ] Touch targets large enough
- [ ] No horizontal scroll

### Mobile (375x667)
- [ ] Single column layout
- [ ] Hamburger menu (if implemented)
- [ ] Buttons easily tappable
- [ ] Text remains readable
- [ ] Images scale properly

---

## ⚡ PERFORMANCE CHECKLIST

### Page Load Times
- [ ] Homepage loads in < 2 seconds
- [ ] Login page loads in < 1 second
- [ ] Subjects page loads in < 2 seconds
- [ ] Video player loads in < 3 seconds
- [ ] Profile page loads in < 2 seconds

### Network Requests
- [ ] No failed requests in Network tab
- [ ] API responses under 500ms
- [ ] No unnecessary requests
- [ ] Assets cached properly

### Browser Performance
- [ ] No console errors
- [ ] No memory leaks
- [ ] Smooth scrolling
- [ ] No layout shifts

---

## 🗄️ DATABASE VERIFICATION

### Tables Created
Run in MySQL:
```sql
USE lms_db;
SHOW TABLES;
```
Should see:
- [ ] users
- [ ] refresh_tokens
- [ ] subjects
- [ ] sections
- [ ] videos
- [ ] video_progress

### Sample Data
```sql
SELECT COUNT(*) FROM subjects;  -- Should be 3
SELECT COUNT(*) FROM sections;  -- Should be 6
SELECT COUNT(*) FROM videos;    -- Should be 14
```

### User Created
```sql
SELECT * FROM users WHERE email = 'test@example.com';
```
- [ ] User exists
- [ ] Password is hashed (not plain text)

---

## 🐛 ERROR CHECKLIST

### Backend Terminal
- [ ] No "Cannot connect to database" errors
- [ ] No "Port already in use" errors
- [ ] No TypeScript compilation errors
- [ ] No "Module not found" errors

### Frontend Terminal
- [ ] No webpack errors
- [ ] No TypeScript errors
- [ ] No "Module not found" errors
- [ ] No ESLint errors stopping build

### Browser Console
- [ ] No JavaScript errors
- [ ] No 404 errors for assets
- [ ] No CORS errors
- [ ] No "Cannot read property" errors

### Network Tab
- [ ] No 500 server errors
- [ ] No 404 not found errors (except expected)
- [ ] No CORS policy blocks
- [ ] All API calls succeed

---

## 🔄 OPTIONAL ENHANCEMENTS

### View Database GUI
- [ ] Run: `npx prisma studio`
- [ ] Opens at http://localhost:5555
- [ ] Can browse all tables
- [ ] Can edit data visually

### Test API with cURL
- [ ] Test registration endpoint
- [ ] Test login endpoint
- [ ] Test get subjects
- [ ] Test save progress

### Code Quality
- [ ] Run backend lint (if configured)
- [ ] Run frontend lint: `npm run lint`
- [ ] Fix any warnings

---

## 📊 FINAL VERIFICATION

### Can You...
- [ ] Register a new account?
- [ ] Login successfully?
- [ ] Browse all courses?
- [ ] View course content?
- [ ] Play first video?
- [ ] Track your progress?
- [ ] Unlock next video?
- [ ] See completed marks?
- [ ] View your profile?
- [ ] Logout and login again?

### Does Everything Look...
- [ ] Professional and modern?
- [ ] Consistent in design?
- [ ] Responsive on mobile?
- [ ] Free of placeholder text?
- [ ] Properly aligned?
- [ ] Good color contrast?

---

## ✅ ALL CHECKS PASSED?

If you checked everything above:

🎉 **Congratulations!** Your Uppskillr LMS is fully functional!

### What's Working:
✅ Full-stack application running  
✅ Database connected and seeded  
✅ Authentication system operational  
✅ Course browsing functional  
✅ Video playback working  
✅ Progress tracking active  
✅ Sequential unlocking working  
✅ Modern UI/UX deployed  

### Next Steps:
1. Explore all features
2. Create more test accounts
3. Try different courses
4. Test on different browsers
5. Share with others!

---

## ❌ SOME CHECKS FAILED?

If anything didn't work:

1. **Don't panic!** This is normal.
2. **Note which check failed**
3. **See TROUBLESHOOTING.md** for that specific issue
4. **Follow the solution steps**
5. **Re-run the failed check**
6. **Continue down the list**

### Common Quick Fixes:

**Backend won't start:**
```bash
cd backend
npx prisma generate
npm run dev
```

**Frontend won't start:**
```bash
cd frontend
npm install
npm run dev
```

**Database issues:**
```bash
cd backend
npx prisma migrate reset
npx prisma db seed
```

**Still stuck?**
→ See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## 📝 CHECKLIST COMPLETION

Date Completed: _______________

Total Checks: ~150  
Passed: _______  
Failed: _______  
Skipped: _______  

Notes:
_______________________________________
_______________________________________
_______________________________________

---

**You're ready to learn with Uppskillr! 🚀📚**
