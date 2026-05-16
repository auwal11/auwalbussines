# 📋 Copy-Paste Commands - Complete Setup

Just copy and paste these commands in order to deploy your Cyber OS!

---

## 1️⃣ Create Repository on GitHub

```bash
# Option A: Using GitHub CLI (Recommended)
gh auth login
gh repo create auwntech-audit/cyber-os-platform --description "Production-grade offensive security operations center" --public

# Option B: Create manually on https://github.com/new
```

---

## 2️⃣ Push Code to GitHub

```bash
cd /vercel/share/v0-project

# Remove old remote if it exists
git remote remove origin 2>/dev/null || true

# Add new remote
git remote add origin https://github.com/auwntech-audit/cyber-os-platform.git

# Verify branch name is "main"
git branch -M main

# Push to GitHub
git push -u origin main --force
```

---

## 3️⃣ Set Up Supabase

### Step 1: Create Project
Visit: https://supabase.com/dashboard
- Click "New Project"
- Name: `cyber-os-platform`
- Region: Select your region
- Click "Create new project"

### Step 2: Run Database Migration
In Supabase SQL Editor (https://supabase.com/dashboard/project/[YOUR-PROJECT]/sql):

Copy this file's entire content:
```
/vercel/share/v0-project/supabase/migrations/001_cyber_os_schema.sql
```

Paste into SQL Editor and execute.

### Step 3: Get Your Keys
From Supabase Dashboard → Settings → API:
- Copy **Project URL** (looks like: https://xxxxx.supabase.co)
- Copy **Anon Key** (looks like: eyJhbGc...)
- Copy **Service Role Key** (looks like: eyJhbGc...)

---

## 4️⃣ Configure Local Environment

Create file: `/vercel/share/v0-project/.env.local`

```env
# Supabase URLs and Keys (from step 3)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Generate a strong secret (min 32 chars)
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long

# Admin token for dashboard access
ADMIN_SESSION_TOKEN=admin-secret-token-12345
```

---

## 5️⃣ Test Locally

```bash
cd /vercel/share/v0-project

# Install dependencies (if not already installed)
pnpm install

# Start development server
pnpm dev

# Open in browser:
# http://localhost:3000/hidden-portal/dashboard
```

---

## 6️⃣ Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to Vercel
cd /vercel/share/v0-project
vercel

# When prompted:
# - Set up and deploy? (Y/n): Y
# - Link to existing project? (y/N): N
# - Which scope to deploy to?: auwntech-audit (or your org)
# - Project name: cyber-os-platform
# - Detected framework: Next.js
# - Build Command: pnpm build
# - Output Directory: .next
# - Root directory: ./

# Wait for deployment to complete...
# Your deployment will be at: https://cyber-os-platform.vercel.app
```

### Option B: Using Vercel Web Dashboard

1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Click "Continue with GitHub"
4. Authenticate if needed
5. Select "auwntech-audit/cyber-os-platform"
6. Framework Preset: Next.js
7. Root Directory: ./
8. Click "Deploy"

---

## 7️⃣ Add Environment Variables to Vercel

In Vercel Dashboard → Project Settings → Environment Variables:

Add these variables (same as your `.env.local`):

```
NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY = eyJhbGc...
JWT_SECRET = your-super-secret-jwt-key-min-32-characters-long
ADMIN_SESSION_TOKEN = admin-secret-token-12345
```

---

## 8️⃣ Access Your Live Application

### URLs

**Local (Development):**
```
http://localhost:3000/hidden-portal/dashboard
```

**Production (Deployed):**
```
https://cyber-os-platform.vercel.app/hidden-portal/dashboard
```

### Admin Credentials
- Any registered user can access after authentication
- Use the dashboard admin panel to manage users and settings

---

## 🧪 Quick Verification Commands

```bash
# Check if repo was pushed
git remote -v
# Should show: origin  https://github.com/auwntech-audit/cyber-os-platform.git (fetch)

# Check current branch
git branch
# Should show: * main

# Check last commit
git log --oneline -1
# Should show your latest commit

# Verify dependencies are installed
pnpm list framer-motion socket.io xterm

# Check build succeeds
pnpm build
# Should complete with: ✓ Compiled successfully
```

---

## 🐛 Troubleshooting Quick Fixes

### Error: "Supabase connection failed"
```bash
# Verify environment variables
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY

# Recreate .env.local with correct values
```

### Error: "Port 3000 already in use"
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# Or use a different port
pnpm dev -- -p 3001
```

### Error: "GitHub authentication failed"
```bash
# Re-authenticate with GitHub
gh auth logout
gh auth login

# Try pushing again
git push -u origin main
```

### Error: "Build failed on Vercel"
```bash
# Rebuild the project
vercel rebuild --prod

# Or deploy again
vercel --prod
```

---

## 📊 Final Verification

After deployment, verify everything works:

```bash
# 1. Check GitHub repo created
# Visit: https://github.com/auwntech-audit/cyber-os-platform

# 2. Check Vercel deployment
# Visit: https://cyber-os-platform.vercel.app

# 3. Check dashboard loads
# Visit: https://cyber-os-platform.vercel.app/hidden-portal/dashboard

# 4. Check Supabase connection
# Visit: https://supabase.com/dashboard and verify tables exist

# 5. Check environment variables in Vercel dashboard
# Verify all 5 variables are set
```

---

## 🎉 Success Criteria

✅ GitHub repository created and code pushed  
✅ Supabase project created with tables  
✅ Local development server runs without errors  
✅ Vercel deployment completed successfully  
✅ Dashboard accessible at production URL  
✅ Real data loading from database  
✅ All modules visible in sidebar  

---

## 📚 Documentation Files

After deployment, refer to these files:

- **CYBER_OS_DOCUMENTATION.md** - Complete API reference and feature docs
- **SETUP_GUIDE.md** - Detailed setup instructions
- **DEPLOYMENT_GUIDE.md** - Deployment troubleshooting
- **PROJECT_SUMMARY.md** - Project overview and stats
- **QUICK_REFERENCE.md** - Quick command lookup
- **WEBSITE_PREVIEW.md** - Visual preview of all modules

---

**Status**: All commands ready to copy-paste ✅
