# 🚀 Deployment Guide - Offensive Cybersecurity OS

## Quick Start (5 minutes)

### Prerequisites
- GitHub account with access to `auwntech-audit` organization
- GitHub CLI installed (`gh --version`)
- Node.js 18+ installed
- Supabase account

---

## Step 1: Create GitHub Repository

### Option A: Using GitHub CLI (Fastest)

```bash
# Install GitHub CLI (if not already installed)
# macOS:
brew install gh

# Linux:
curl -sS https://webi.sh/gh | sh

# Windows:
choco install gh
```

```bash
# Authenticate with GitHub
gh auth login

# Create the repository
gh repo create auwntech-audit/cyber-os-platform \
  --description "Production-grade offensive security operations center" \
  --public
```

### Option B: Manual GitHub Web

1. Go to https://github.com/new
2. Organization: `auwntech-audit`
3. Repository name: `cyber-os-platform`
4. Description: `Production-grade offensive security operations center with real-time reconnaissance and reporting`
5. Public
6. Click "Create repository"

---

## Step 2: Push Code to Repository

```bash
# Navigate to project directory
cd /vercel/share/v0-project

# Add remote if not already added
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/auwntech-audit/cyber-os-platform.git

# Push to main branch
git branch -m master main  # If needed
git push -u origin main --force
```

**Expected Output:**
```
Enumerating objects: 450, done.
Counting objects: 100% (450/450), done.
Compressing objects: 100% (380/380), done.
Writing objects: 100% (450/450), 2.45 MiB | 5.23 MiB/s, done.
Total 450 (delta 150), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (150/150), done.
To github.com:auwntech-audit/cyber-os-platform.git
 * [new branch]      main -> main
branch 'main' set to track 'origin/main'.
```

---

## Step 3: Set Up Supabase

### 1. Create Supabase Project

```bash
# Go to https://supabase.com/dashboard
# Click "New Project"
# Project Name: cyber-os-platform
# Database Password: [Strong password]
# Region: Your preferred region
```

### 2. Create Tables

```bash
# In Supabase SQL Editor, run the migration:
# Navigate to: SQL Editor → New Query

# Copy the entire contents of:
# supabase/migrations/001_cyber_os_schema.sql

# Paste and execute
```

### 3. Get Connection Credentials

In Supabase Dashboard:
- Go to Settings → API
- Copy:
  - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
  - Anon Key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - Service Role Key → `SUPABASE_SERVICE_ROLE_KEY`

---

## Step 4: Configure Environment Variables

### Local Development

Create `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-chars

# Admin Access
ADMIN_SESSION_TOKEN=admin-token-12345
```

### Test Locally

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Access the app
# Open: http://localhost:3000/hidden-portal/dashboard
```

---

## Step 5: Deploy to Vercel

### Option A: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# When prompted:
# - Connect to Git repository: Yes
# - Select GitHub organization: auwntech-audit
# - Select repository: cyber-os-platform
# - Framework: Next.js
# - Build Command: pnpm build
# - Output Directory: .next
```

### Option B: Vercel Web Dashboard

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import Git Repository
4. Select `auwntech-audit/cyber-os-platform`
5. Framework Preset: Next.js
6. Root Directory: ./
7. Click "Deploy"

---

## Step 6: Configure Vercel Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables:

Add all variables from your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
ADMIN_SESSION_TOKEN=admin-token-12345
```

---

## Step 7: Access the Live Application

### Dashboard URLs

**Local Development:**
```
http://localhost:3000/hidden-portal/dashboard
```

**Production (Vercel):**
```
https://cyber-os-platform.vercel.app/hidden-portal/dashboard
```

### Admin Access

1. Navigate to `/hidden-portal`
2. Authenticate using your admin credentials
3. Access all security modules

---

## Complete Architecture

```
GitHub Repository
    ↓
(auwntech-audit/cyber-os-platform)
    ↓
Vercel Deployment
    ↓
https://cyber-os-platform.vercel.app
    ↓
Frontend (Next.js 15)
    ↓
API Routes (Node.js)
    ↓
Supabase PostgreSQL
```

---

## Module Accessibility

After deployment, access modules at:

| Module | URL |
|--------|-----|
| Dashboard | `/dashboard` |
| Recon | `/dashboard/recon` |
| Web Exploitation | `/dashboard/web-exploit` |
| API Security | `/dashboard/api-security` |
| Network Attacks | `/dashboard/network` |
| Exploitation | `/dashboard/exploitation` |
| Post-Exploitation | `/dashboard/post-exploit` |
| Automation | `/dashboard/automation` |
| Terminal | `/dashboard/terminal` |
| Findings | `/dashboard/findings` |
| Reporting | `/dashboard/reporting` |
| AI Assistant | `/dashboard/ai-assistant` |

---

## Troubleshooting

### Issue: "Invalid JWT"
**Solution:** Check `JWT_SECRET` is the same in all environments

### Issue: "Supabase Connection Failed"
**Solution:** Verify URLs and keys are correct in environment variables

### Issue: "Build Fails on Vercel"
**Solution:** 
```bash
# Clear cache and rebuild
vercel rebuild

# Or redeploy
vercel --prod
```

### Issue: "Port Already in Use"
**Solution:**
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# Or use different port
pnpm dev -- -p 3001
```

---

## Performance Optimization

### Vercel Analytics
```bash
# Vercel Dashboard → Analytics
# Monitor:
# - Page Load Times
# - TTFB (Time to First Byte)
# - CLS (Cumulative Layout Shift)
# - LCP (Largest Contentful Paint)
```

### Database Optimization
```sql
-- In Supabase SQL Editor:
CREATE INDEX idx_findings_severity ON findings(severity);
CREATE INDEX idx_findings_target_id ON findings(target_id);
CREATE INDEX idx_scans_status ON scans(status);
```

---

## Security Best Practices

✅ **Environment Variables**
- Never commit `.env.local` to Git
- Use Vercel environment variables for production
- Rotate JWT_SECRET regularly

✅ **Database Security**
- Enable RLS policies (already configured)
- Use Service Role Key only on backend
- Regularly audit table access

✅ **API Security**
- Rate limiting enabled on all routes
- Input validation with Zod
- CORS configured for your domain
- SQL injection prevention with parameterized queries

---

## Monitoring & Logging

### Vercel Logs
```bash
# View production logs
vercel logs --prod

# View real-time logs
vercel logs --follow
```

### Supabase Monitoring
- Dashboard → Database → Logs
- Check for slow queries
- Monitor storage usage

---

## Maintenance

### Regular Updates
```bash
# Check for updates
pnpm outdated

# Update dependencies
pnpm update

# Commit and push
git add .
git commit -m "chore: update dependencies"
git push
```

### Database Backups
- Supabase: Automatic daily backups (free plan)
- Enable point-in-time recovery in project settings

---

## Next Steps

1. ✅ Create repository on GitHub
2. ✅ Push code to main branch
3. ✅ Set up Supabase project
4. ✅ Deploy to Vercel
5. ⏭️ **Configure security integrations**
   - Connect scanning tools (subfinder, nmap)
   - Integrate Metasploit
   - Set up automation workflows

---

## Support

For issues or questions:
- GitHub Issues: https://github.com/auwntech-audit/cyber-os-platform/issues
- Documentation: See CYBER_OS_DOCUMENTATION.md
- Quick Reference: See QUICK_REFERENCE.md

---

**Deployment Status**: Ready for Production ✅
