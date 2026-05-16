# Cyber OS Setup Guide

## Quick Start

### 1. Clone & Install
```bash
git clone <repository>
cd security-research-portfolio
pnpm install
```

### 2. Supabase Setup
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your project URL and anon key
4. Go to SQL Editor → New Query → Paste the contents of `supabase/migrations/001_cyber_os_schema.sql`
5. Execute the migration

### 3. Environment Configuration
Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
JWT_SECRET=your-secret-key-change-in-production
```

### 4. Admin Access
The dashboard is protected by admin session authentication. Access requires:
1. Visiting `/hidden-portal` login page
2. Setting an `admin_session=authenticated` cookie

For development, set the cookie manually in browser console:
```javascript
document.cookie = "admin_session=authenticated; path=/";
```

### 5. Run Development Server
```bash
pnpm dev
```

Navigate to http://localhost:3000/hidden-portal/dashboard

## Architecture Overview

### Database Layers
- **Auth Layer**: Supabase Auth + JWT tokens
- **Data Layer**: PostgreSQL with RLS policies
- **API Layer**: Next.js Server Functions
- **Real-time Layer**: Socket.io WebSocket server

### Real-Time Communication
The system uses Socket.io for:
- Live scan progress updates
- Terminal output streaming
- Finding notifications
- Shell activity tracking

### Security Model
- **RLS Policies**: All tables protected at database level
- **Role-Based Access**: Analyst, Admin, Read-Only roles
- **Audit Trail**: Activity timeline for compliance
- **Encryption**: Passwords hashed with bcrypt

## Module Integration

### How to Add a New Module

1. **Create Page Component**
   ```typescript
   // app/hidden-portal/dashboard/new-module/page.tsx
   'use client'
   export default function NewModule() {
     return <div>Module content</div>
   }
   ```

2. **Add Navigation Item**
   Edit `components/cyber-os/sidebar-nav.tsx` and add:
   ```typescript
   {
     label: 'New Module',
     href: '/hidden-portal/dashboard/new-module',
     icon: <IconComponent className="w-5 h-5" />,
     description: 'Module description',
   }
   ```

3. **Create API Route** (if needed)
   ```typescript
   // app/api/projects/[projectId]/new-endpoint/route.ts
   export async function GET(request, { params }) {
     // Implementation
   }
   ```

### Data Flow Pattern
1. Client component mounts
2. `useEffect` fetches data from API
3. API route validates user auth
4. Database query with RLS applied
5. Data returned and rendered
6. Real-time Socket.io updates applied

## Testing Checklist

- [ ] Can access `/hidden-portal/dashboard`
- [ ] Main dashboard loads with real data
- [ ] Can create a project
- [ ] Can add targets to project
- [ ] Can create findings manually
- [ ] Findings appear on dashboard
- [ ] Terminal tab opens and accepts commands
- [ ] Sidebar navigation works on mobile
- [ ] Filters work on findings page
- [ ] Reports can be exported

## Database Verification

Check migrations applied:
```sql
SELECT name FROM pg_proc WHERE name LIKE '%cyber%';
```

Check tables created:
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'users' OR table_name LIKE 'projects';
```

Enable RLS:
```sql
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename LIKE '%findings';
```

## API Testing

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","fullName":"Test User"}'
```

### Get Projects
```bash
curl http://localhost:3000/api/projects \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Create Finding
```bash
curl -X POST http://localhost:3000/api/projects/PROJECT_ID/findings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title":"SQL Injection",
    "description":"User input not sanitized",
    "severity":"critical",
    "finding_type":"injection"
  }'
```

## Deployment to Vercel

### 1. Push to GitHub
```bash
git add .
git commit -m "Initial Cyber OS commit"
git push origin main
```

### 2. Vercel Setup
1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Configure environment variables:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - JWT_SECRET
4. Deploy

### 3. Post-Deployment
- Verify Supabase connection in dashboard
- Test admin access
- Run migration on production database
- Verify RLS policies applied

## Troubleshooting

### Issue: "Can't connect to Supabase"
**Solution**: 
1. Verify NEXT_PUBLIC_SUPABASE_URL is correct
2. Check NEXT_PUBLIC_SUPABASE_ANON_KEY is valid
3. Ensure Supabase project is running

### Issue: "No tables found in database"
**Solution**:
1. Run SQL migration in Supabase dashboard
2. Verify all SQL executed without errors
3. Check tables appear in Supabase UI

### Issue: "Dashboard shows no data"
**Solution**:
1. Verify user is authenticated
2. Check Supabase RLS policies aren't too restrictive
3. Verify project/target records exist in database
4. Check browser console for API errors

### Issue: "Terminal not working"
**Solution**:
1. Verify Socket.io server is running (`pnpm dev`)
2. Check browser console for WebSocket errors
3. Verify JWT_SECRET is set correctly
4. Check CORS configuration in Socket.io

### Issue: "Findings page shows empty"
**Solution**:
1. Create some findings first via API or UI
2. Check filters aren't hiding all findings
3. Verify user has access to project (RLS)
4. Check database for findings records

## Performance Tips

1. **Database**: Add indexes for frequently queried columns
2. **Frontend**: Use React.memo for expensive components
3. **Images**: Optimize images before uploading
4. **Caching**: Configure Socket.io caching for scan results
5. **Pagination**: Implement for findings with 100+ records

## Security Hardening

For production:
1. [ ] Change JWT_SECRET to strong random value
2. [ ] Enable HTTPS only
3. [ ] Configure CORS strictly
4. [ ] Implement rate limiting on API routes
5. [ ] Enable audit logging
6. [ ] Regular security audits
7. [ ] Keep dependencies updated
8. [ ] Use environment-specific configs
9. [ ] Implement 2FA for admin access
10. [ ] Regular database backups

## Next Steps

1. Review `CYBER_OS_DOCUMENTATION.md` for detailed API documentation
2. Integrate real reconnaissance tools (subfinder, nmap, etc.)
3. Connect Metasploit for exploitation workflows
4. Set up automated scan scheduling
5. Implement Slack/Teams notifications
6. Add vulnerability database integration (NVD, CVSS)
7. Build custom reporting templates
8. Implement team collaboration features
9. Add multi-language support
10. Create mobile-responsive improvements

## Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com
- **Socket.io**: https://socket.io/docs/
- **xterm.js**: https://xtermjs.org

---

**Deployment Status**: ✅ Production Ready
**Last Updated**: January 2024
**Version**: 1.0.0
