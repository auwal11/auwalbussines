# Cyber OS Quick Reference Guide

## 🚀 5-Minute Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Set environment variables in .env.local
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
JWT_SECRET=your_secret

# 3. Run Supabase migration
# - Go to Supabase SQL Editor
# - Copy/paste: supabase/migrations/001_cyber_os_schema.sql
# - Execute

# 4. Start dev server
pnpm dev

# 5. Access dashboard
# http://localhost:3000/hidden-portal/dashboard
```

## 📋 Module Quick Links

| Module | Path | Purpose |
|--------|------|---------|
| Dashboard | `/dashboard` | Overview & stats |
| Recon | `/recon` | Subdomain enum, DNS, tech detect |
| Web Exploit | `/web-exploit` | Payload library & request repeater |
| API Security | `/api-security` | JWT, IDOR, rate limiting tests |
| Network | `/network` | Port scans, service enum, CVE lookup |
| Exploitation | `/exploitation` | Reverse shells, payloads, privilege escalation |
| Post-Exploit | `/post-exploit` | Persistence, lateral movement, artifacts |
| Automation | `/automation` | Workflows, scheduling, execution logs |
| Terminal | `/terminal` | xterm.js integrated console |
| Findings | `/findings` | Vulnerability management & tracking |
| Reporting | `/reporting` | Report generation, CVSS calculator |
| AI Assistant | `/ai-assistant` | AI analysis & recommendations |

## 🔑 Key API Endpoints

```bash
# Get Projects
curl http://localhost:3000/api/projects \
  -H "Authorization: Bearer YOUR_JWT"

# Create Finding
curl -X POST http://localhost:3000/api/projects/PROJECT_ID/findings \
  -H "Content-Type: application/json" \
  -d '{
    "title": "SQL Injection",
    "description": "Vulnerable parameter",
    "severity": "critical",
    "finding_type": "injection"
  }'

# List Findings (Filtered)
curl "http://localhost:3000/api/projects/PROJECT_ID/findings?severity=critical&status=open"

# Start Scan
curl -X POST http://localhost:3000/api/projects/PROJECT_ID/scans \
  -H "Content-Type: application/json" \
  -d '{
    "scan_type": "subdomain_enum",
    "tool_name": "subfinder",
    "target_id": "TARGET_ID"
  }'
```

## 💾 Database Quick Commands

```sql
-- Check tables created
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Count findings
SELECT severity, COUNT(*) FROM findings 
GROUP BY severity;

-- List active scans
SELECT id, tool_name, status, progress 
FROM scans WHERE status IN ('running', 'pending');

-- Get team members
SELECT email, role FROM user_profiles 
WHERE team_id = 'YOUR_TEAM_ID';

-- Activity timeline
SELECT action_type, COUNT(*) FROM activity_timeline 
GROUP BY action_type;
```

## 🔌 WebSocket Events

```javascript
// Client side
const socket = io('http://localhost:3000', {
  auth: { token: 'your_jwt_token' }
});

// Join project for live updates
socket.emit('join-project', 'project-id-here');

// Listen for scan progress
socket.on('scan-progress', (data) => {
  console.log(`Scan ${data.scanId}: ${data.progress}%`);
});

// Listen for findings
socket.on('finding-created', (finding) => {
  console.log(`New finding: ${finding.title}`);
});

// Terminal output
socket.on('terminal-output', (data) => {
  console.log(data.output);
});
```

## 📊 Dashboard Data Flow

```
User Login
    ↓
Supabase Auth (JWT)
    ↓
RLS Policies Check
    ↓
Load User's Teams & Projects
    ↓
Fetch Findings (summarized by severity)
    ↓
Fetch Active Scans
    ↓
Render Charts & Overview
    ↓
Socket.io: Subscribe to real-time updates
```

## 🛡️ Security Headers

Required in production:
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: default-src 'self'
```

## 🔐 Authentication Flow

```
1. User navigates to /hidden-portal
2. Check admin_session cookie
3. If not authenticated, show login
4. After auth, Supabase creates JWT
5. JWT stored in session
6. All API calls include JWT
7. RLS policies validate access
8. Data returned only if authorized
```

## 📈 Common Operations

### Create New Project
```typescript
const response = await fetch('/api/projects', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Q1 2024 Assessment',
    slug: 'q1-2024',
    description: 'Security audit',
    scope: 'In scope: *.example.com'
  })
});
```

### Add Target
```typescript
const response = await fetch(`/api/projects/${projectId}/targets`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'example.com',
    type: 'domain',
    value: 'example.com',
    priority: 'high'
  })
});
```

### Create Finding
```typescript
const response = await fetch(`/api/projects/${projectId}/findings`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Vulnerability Title',
    description: 'Detailed description',
    severity: 'critical',
    finding_type: 'injection',
    cvss_score: 9.8
  })
});
```

## 🧪 Testing Checklist

- [ ] Dashboard loads
- [ ] Can create project
- [ ] Can add target
- [ ] Can create finding
- [ ] Terminal opens
- [ ] Navigation works
- [ ] Filters work
- [ ] Sidebar responsive
- [ ] Charts render
- [ ] API returns data

## ⚙️ Environment Variables Reference

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=https://project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
JWT_SECRET=your_super_secret_key

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## 🚨 Troubleshooting Shortcuts

**Build fails?**
```bash
rm -rf .next && pnpm build
```

**DB connection fails?**
- Check `.env.local` has correct credentials
- Verify Supabase project is running
- Confirm anon key is valid

**No data showing?**
- Check RLS policies are applied
- Verify user is authenticated
- Confirm records exist in database
- Check browser DevTools console

**Terminal not working?**
- Confirm `pnpm dev` is running
- Check JWT_SECRET is set
- Verify Socket.io can connect
- Check CORS settings

**WebSocket fails?**
- Look for Socket.io connection errors
- Verify auth token is valid
- Check firewall allows connections
- Try in incognito mode

## 📚 Documentation Map

```
├── README.md (main overview)
├── SETUP_GUIDE.md (detailed setup)
├── CYBER_OS_DOCUMENTATION.md (full API docs)
├── PROJECT_SUMMARY.md (what was built)
└── QUICK_REFERENCE.md (this file)
```

## 💡 Pro Tips

1. **Use Terminal for quick commands** - More powerful than UI for complex operations
2. **Filter findings by severity** - Focus on critical issues first
3. **Organize by projects** - Keep assessments separate
4. **Export reports regularly** - Have evidence trails
5. **Use AI assistant** - Get remediation suggestions
6. **Schedule automation** - Save time on recurring tasks
7. **Tag findings** - Organize by vulnerability type
8. **Download terminal logs** - Keep evidence of commands
9. **Create templates** - Reuse payload combinations
10. **Monitor real-time** - Watch scans as they progress

## 🔗 Useful Links

- **Supabase Dashboard**: https://app.supabase.com
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com
- **Socket.io Docs**: https://socket.io/docs/
- **xterm.js**: https://xtermjs.org

## 📝 Commonly Used Severity Levels

- **🔴 CRITICAL**: Immediate exploitation possible, full system compromise
- **🟠 HIGH**: Serious vulnerability, significant risk of exploitation
- **🟡 MEDIUM**: Moderate risk, requires specific conditions
- **🔵 LOW**: Minor issue, low risk of exploitation
- **⚪ INFO**: Informational, no security impact

## 🎯 Typical Workflow

1. Create project with scope
2. Add targets (domains, IPs)
3. Run reconnaissance scans
4. Analyze results in dashboard
5. Create findings from discoveries
6. Assign findings to team
7. Track remediation progress
8. Generate final report
9. Export and deliver

---

**Last Updated**: January 2024
**Quick Ref Version**: 1.0
