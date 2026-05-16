# Offensive Cybersecurity Operating System Documentation

## Overview

A production-grade offensive security operations center (SOC) dashboard built with Next.js 15, TypeScript, Supabase, Socket.io, and xterm.js. This system provides real-time reconnaissance, vulnerability management, and exploitation tools for red team operations.

## Architecture

### Technology Stack

- **Frontend**: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4
- **UI Components**: shadcn/ui with glassmorphism theme
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Database**: Supabase PostgreSQL with RLS policies
- **Real-time**: Socket.io for WebSocket communication
- **Terminal**: xterm.js with addon support
- **Authentication**: Supabase Auth + JWT
- **Security**: bcrypt password hashing, RBAC

### Project Structure

```
/app
  /api
    /auth/register          # User registration
    /projects               # Project CRUD
    /projects/[projectId]
      /targets              # Target management
      /findings             # Vulnerability findings
      /scans                # Security scans
  /hidden-portal
    /dashboard
      /page.tsx             # Main dashboard overview
      /recon                # Reconnaissance module
      /web-exploit          # Web exploitation testing
      /api-security         # API security testing (JWT, IDOR, rate limits)
      /network              # Network attacks (port scans, service enum)
      /exploitation         # Exploitation & payload delivery
      /post-exploit         # Post-exploitation & lateral movement
      /automation           # Workflow automation
      /terminal             # Integrated xterm.js console
      /findings             # Vulnerability findings management
      /reporting            # Report generation & CVSS scoring
      /ai-assistant         # AI-powered analysis

/components
  /cyber-os
    /sidebar-nav.tsx        # Main navigation sidebar

/lib
  /supabase
    /client.ts              # Browser Supabase client
    /server.ts              # Server-side Supabase client
  /auth
    /jwt.ts                 # JWT utilities
  /websocket
    /server.ts              # Socket.io server setup

/supabase
  /migrations
    /001_cyber_os_schema.sql  # Complete database schema
```

## Database Schema

### Core Tables

#### Users & Authentication
- `user_profiles` - Extended user information with roles and teams
- `teams` - Organization/team management

#### Projects & Targets
- `projects` - Security assessment projects
- `targets` - Scope items (domains, IPs, applications)

#### Reconnaissance Data
- `subdomains` - Discovered subdomains with metadata
- `dns_records` - DNS enumeration results
- `whois_records` - WHOIS information
- `tech_fingerprints` - Technology stack detection
- `live_hosts` - Active host discovery
- `port_scans` - Port scan results
- `service_details` - Service enumeration data

#### Findings & Vulnerabilities
- `findings` - Security findings/vulnerabilities
- `finding_evidence` - Evidence artifacts (screenshots, logs)

#### Scans & Automation
- `scans` - Security scan jobs (status, results)
- `automation_workflows` - Workflow definitions
- `automation_logs` - Execution logs

#### Exploitation & Post-Exploitation
- `reverse_shells` - Active shell sessions
- `lateral_movements` - Inter-host movement tracking
- `persistence_mechanisms` - Persistence tracking
- `data_artifacts` - Collected data inventory

#### Reporting & Documentation
- `reports` - Security assessment reports
- `report_attachments` - Report artifacts
- `notes` - Project documentation
- `activity_timeline` - Audit trail

#### API Testing
- `request_templates` - API test request templates
- `payload_library` - Payload collection
- `jwt_tests` - JWT analysis records

## Module Features

### 1. Reconnaissance & Enumeration
- **Subdomain enumeration** with integration placeholders for subfinder, assetfinder
- **DNS analysis** (A, AAAA, CNAME, MX, TXT, NS records)
- **WHOIS lookup** with registrant information
- **HTTP tech fingerprinting** (frameworks, servers, databases)
- **Live host detection** with response time monitoring
- **Attack surface mapping** with visual organization

**API Endpoints**:
- `GET /api/projects/[projectId]/targets` - List targets
- `POST /api/projects/[projectId]/targets` - Create target
- `GET /api/projects/[projectId]/scans` - List scans
- `POST /api/projects/[projectId]/scans` - Start scan

### 2. Web Exploitation Testing
- **OWASP Top 10 payload library** with injection, XSS, SSTI, path traversal, command injection
- **Request repeater** for manual API testing
- **Payload customization** with one-click copying
- **Request history** tracking with responses
- **Visual payload organization** by vulnerability type

### 3. API Security Testing
- **JWT decoder** with vulnerability detection
  - Algorithm none detection
  - Missing claims validation
  - Signature verification
- **Rate limiting tester** for endpoint protection testing
- **IDOR/BOLA testing** with object ID manipulation
- **API endpoint catalog** with method and description

### 4. Network Attacks & Enumeration
- **Port scanning** with service identification
- **Service enumeration** (SMB, SSH, FTP, HTTP, MySQL, PostgreSQL, Redis)
- **CVE lookup** with vulnerability mapping
- **Service vulnerability details** with exploitation guidance
- **Real-time port state tracking** (open, closed, filtered)

### 5. Exploitation & Payload Delivery
- **Reverse shell management** with session tracking
- **Metasploit integration** framework
- **Privilege escalation notes** and techniques
- **Payload generator** with customization
- **Exploit delivery** coordination

### 6. Post-Exploitation
- **Persistence tracking** (scheduled tasks, services, SSH keys)
- **Lateral movement mapping** with method tracking
- **Data artifact inventory** with sensitivity marking
- **Activity timeline** for chronological event tracking
- **Evidence collection** and organization

### 7. Automation & Workflows
- **Python automation runner** for custom scripts
- **Bash script executor** for system commands
- **Workflow definition** in YAML format
- **Scheduled execution** with cron support
- **Execution logs** and result tracking
- **Fuzzing engine** integration placeholder
- **Custom tool launcher** interface

### 8. Integrated Terminal
- **xterm.js integration** with full terminal emulation
- **Multi-tab support** for parallel command execution
- **Command history** tracking
- **Real-time output** streaming
- **Terminal log download** for evidence
- **Custom commands**:
  - `help` - Show available commands
  - `scan` - Start network scan
  - `recon` - Begin reconnaissance
  - `exploit` - Show exploitation options
  - `shell` - Open reverse shell
  - `clear` - Clear terminal

### 9. Findings & Vulnerability Management
- **Real-time finding creation** with detailed metadata
- **Severity classification** (Critical, High, Medium, Low, Info)
- **CVSS scoring** support
- **CWE/CVE mapping** for vulnerability tracking
- **Status tracking** (Open, In Progress, Resolved, False Positive)
- **Assignment** to team members
- **Evidence attachment** support
- **Filtering** by severity and status
- **Rich charts** showing distribution

### 10. Report Generation
- **Professional report templates**
  - Executive Summary
  - Technical Findings
  - Full Assessment
  - Remediation Plan
- **CVSS Calculator** with vector customization
- **Severity distribution** visualization
- **Finding summary** statistics
- **Risk rating** classification
- **PDF export** support
- **Markdown content** generation

### 11. AI Security Assistant
- **Vulnerability analysis** with AI recommendations
- **Remediation suggestions** based on findings
- **Attack path recommendations** from discovered vulnerabilities
- **Reconnaissance guidance** for comprehensive coverage
- **Real-time chat interface** for security questions
- **Template prompts** for common queries
- **AI insights** summary generation

### 12. Real-Time Features
- **WebSocket integration** via Socket.io
- **Live scan progress** updates
- **Real-time finding notifications**
- **Reverse shell activity** streaming
- **Terminal command execution** feedback
- **Project room subscriptions** for team collaboration

## API Routes

### Authentication
```
POST /api/auth/register
  - Body: { email, password, fullName }
  - Response: { userId, message }
```

### Projects
```
GET /api/projects
  - Response: { projects: Project[] }

POST /api/projects
  - Body: { name, slug, description, scope, startDate, endDate, budget, teamId }
  - Response: Project
```

### Targets
```
GET /api/projects/[projectId]/targets
  - Response: { targets: Target[] }

POST /api/projects/[projectId]/targets
  - Body: { name, type, value, description, priority, tags }
  - Response: Target
```

### Findings
```
GET /api/projects/[projectId]/findings?severity=high&status=open
  - Response: { findings: Finding[], summary: SeveritySummary }

POST /api/projects/[projectId]/findings
  - Body: { title, description, finding_type, severity, cvss_score, affected_endpoint, proof_of_concept, target_id }
  - Response: Finding

GET /api/projects/[projectId]/findings/[findingId]
  - Response: { finding: Finding with evidence }

PUT /api/projects/[projectId]/findings/[findingId]
  - Body: { status, assigned_to, ... }
  - Response: Finding

DELETE /api/projects/[projectId]/findings/[findingId]
  - Response: { message: "Success" }
```

### Scans
```
GET /api/projects/[projectId]/scans
  - Response: { scans: Scan[] }

POST /api/projects/[projectId]/scans
  - Body: { scan_type, tool_name, target_id, parameters }
  - Response: Scan
```

## WebSocket Events

### Connection
```javascript
io.on('connection', (socket) => {
  // Client connects with JWT token
})
```

### Client Events
```javascript
socket.emit('join-project', projectId)
socket.emit('scan-progress', { scanId, progress })
socket.emit('terminal-command', { sessionId, command })
socket.emit('finding-created', findingData)
socket.emit('shell-activity', shellData)
```

### Server Events
```javascript
socket.on('joined-project', { projectId })
socket.on('scan-progress', data)
socket.on('terminal-output', { sessionId, output })
socket.on('finding-created', finding)
socket.on('shell-activity', activity)
```

## Database Schema Highlights

### Row Level Security (RLS)
All user-accessible tables have RLS policies enforcing:
- Users can only view data from teams they're members of
- Project data is scoped to team membership
- Finding data requires project access
- Admin functions available to team owners

### Indexes
Strategic indexes on:
- `project_id` for query optimization
- `status` fields for filtering
- `severity` for sorting findings
- `target_id` for relationships

## Deployment & Configuration

### Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
JWT_SECRET=your_jwt_secret_for_websocket_auth
```

### Database Setup
1. Create Supabase project
2. Run migration: `supabase/migrations/001_cyber_os_schema.sql`
3. Enable RLS on all tables
4. Configure JWT for authentication

### Build & Deploy
```bash
# Development
pnpm dev

# Production build
pnpm build
pnpm start

# Deploy to Vercel
vercel deploy
```

## Security Considerations

1. **Authentication**: All API routes require valid Supabase user
2. **RLS Policies**: Enforce data isolation at database level
3. **JWT Tokens**: Signed with JWT_SECRET for WebSocket auth
4. **Password Hashing**: bcrypt with salt rounds
5. **CORS**: Configured for Socket.io connections
6. **Input Validation**: Zod schemas for request validation
7. **SQL Injection**: Supabase parameterized queries
8. **XSS Protection**: React escaping and sanitization
9. **Rate Limiting**: Implement via API middleware (optional)

## Integration Points

### Tool Integrations (Ready for Implementation)
- **subfinder** - Subdomain enumeration
- **assetfinder** - Asset discovery
- **httpx** - HTTP tech detection
- **dnsx** - DNS analysis
- **nmap** - Port scanning
- **nuclei** - Vulnerability scanning
- **metasploit** - Exploitation framework
- **burp** - Web proxy integration

### Data Flow
1. Tools execute via API routes
2. Results stored in Supabase
3. Real-time updates via Socket.io
4. UI reflects data immediately
5. Historical tracking in database

## Performance Optimizations

- **Database Queries**: Indexed and optimized for common operations
- **Caching**: Socket.io reduces redundant API calls
- **Pagination**: Implement for large result sets
- **Lazy Loading**: Charts and components load on demand
- **Code Splitting**: Next.js automatic route-based splitting

## Future Enhancements

1. **Advanced AI Integration**: More sophisticated vulnerability analysis
2. **Video Evidence**: Screen recording for exploit demonstrations
3. **Collaboration Features**: Real-time team collaboration on findings
4. **Mobile App**: React Native implementation
5. **Workflow Designer**: Visual workflow builder UI
6. **Custom Integrations**: Webhook support for external tools
7. **API Rate Limiting**: Per-user/endpoint controls
8. **Audit Logging**: Detailed activity tracking
9. **2FA/MFA**: Multi-factor authentication
10. **Custom Branding**: White-label support

## Troubleshooting

### Build Issues
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `pnpm install`
- Rebuild: `pnpm build`

### Runtime Issues
- Check Supabase connection: Verify env vars
- Check WebSocket: Ensure Socket.io server running
- Check CORS: Review Socket.io configuration
- Check RLS: Verify policies in Supabase dashboard

### Database Issues
- Run migrations: Use Supabase dashboard
- Check RLS policies: Ensure they're enabled
- Verify auth: Confirm user has proper permissions
- Reset data: Truncate tables and restart

## API Response Examples

### Create Finding
```json
{
  "id": "uuid",
  "project_id": "uuid",
  "title": "SQL Injection in Login",
  "description": "User input not sanitized in login form",
  "severity": "critical",
  "cvss_score": 9.8,
  "status": "open",
  "created_at": "2024-01-15T10:30:00Z"
}
```

### Scan Progress
```json
{
  "id": "uuid",
  "scan_type": "subdomain_enum",
  "tool_name": "subfinder",
  "status": "running",
  "progress": 45,
  "findings_count": 23,
  "started_at": "2024-01-15T10:00:00Z"
}
```

## License

This project is intended for authorized security testing only. Unauthorized access to computer systems is illegal.

---

**Last Updated**: January 2024
**Version**: 1.0.0 Production
