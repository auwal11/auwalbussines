# 🔐 Offensive Cybersecurity OS - Website Preview

## Live Application

**URL**: `http://localhost:3000/hidden-portal/dashboard`

### Dashboard Overview

The main dashboard displays real-time security metrics:

```
┌─────────────────────────────────────────────────────────────────┐
│  CYBER OPERATING SYSTEM                                         │
│  Real-time offensive security operations center                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │ Critical │  │   High   │  │  Active  │  │  Total   │       │
│  │ Findings │  │Severity  │  │  Scans   │  │Projects  │       │
│  │    12    │  │    5     │  │    3     │  │    8     │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│                                                                 │
│  Weekly Activity               Severity Distribution            │
│  ┌──────────────────────┐     ┌──────────────────────┐         │
│  │ Line Chart           │     │ Critical  ████████  12│         │
│  │ Scans & Findings     │     │ High      ██████  5  │         │
│  │ Trend Data           │     │ Medium    ████  3    │         │
│  └──────────────────────┘     │ Low       ██  2      │         │
│                               │ Info      █  1       │         │
│                               └──────────────────────┘         │
│                                                                 │
│  Recent Findings                                                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ SQL Injection on /admin  │ target.example.com │ CRITICAL│   │
│  │ XSS Vulnerability        │ target.example.com │ HIGH    │   │
│  │ Weak Authentication      │ api.target.com     │ HIGH    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Quick Actions                                                  │
│  ┌──────────────────────┐  ┌──────────────────────┐           │
│  │ Start Reconnaissance │  │   Open Terminal      │           │
│  │ Begin with subdomain │  │ Execute commands &   │           │
│  │ enumeration & asset  │  │ run tools            │           │
│  │ mapping              │  │                      │           │
│  └──────────────────────┘  └──────────────────────┘           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Sidebar Navigation

```
┌────────────────────┐
│  CYBER OS MENU     │
├────────────────────┤
│ 🏠 Dashboard       │
├────────────────────┤
│ 🔍 Recon           │
│ 🌐 Web Exploit     │
│ 🔒 API Security    │
│ 🔌 Network Attacks │
│ ⚔️  Exploitation    │
│ 👁️  Post-Exploit    │
│ 🤖 Automation      │
│ 💻 Terminal        │
├────────────────────┤
│ 🎯 Findings        │
│ 📊 Reporting       │
│ 🤖 AI Assistant    │
├────────────────────┤
│ ⚙️  Settings        │
│ 🚪 Logout          │
└────────────────────┘
```

## Module Pages

### 1. Recon & Enumeration
- Real subdomain enumeration interface
- DNS analysis tools
- WHOIS lookup panel
- Attack surface mapping visualization
- Live host detection display
- HTTP tech fingerprinting results

### 2. Web Exploitation
- OWASP Top 10 testing workspace
- Request repeater with payload builder
- XSS payload tester
- SQLi testing panel
- Authentication bypass toolkit
- File upload testing interface

### 3. API Security
- JWT analyzer and decoder
- Token manipulation lab
- Rate limit tester
- Mass assignment vulnerability detector
- IDOR/BOLA testing tool
- Request replay engine

### 4. Network Attacks
- Port scanning dashboard
- Service enumeration display
- SMB/LDAP analysis panel
- MITM toolkit integration
- CVE lookup interface

### 5. Exploitation
- Metasploit integration panel
- Reverse shell management
- Privilege escalation notes
- Payload generator
- Shellcode builder

### 6. Post-Exploitation
- Persistence tracking dashboard
- Lateral movement mapping
- Evidence collection interface
- Data inventory system
- Activity timeline view

### 7. Automation
- Python automation runner
- Bash script executor
- Custom tool launcher
- Fuzzing engine interface
- Workflow automation builder

### 8. Terminal System
```
┌─────────────────────────────────────────┐
│  TERMINAL  [Tab 1] [Tab 2] [+ Add Tab]  │
├─────────────────────────────────────────┤
│                                         │
│ user@cyber-os:~$ nmap -sV target.com   │
│ Starting Nmap 7.94 at 2024-12-20       │
│ Nmap scan report for target.com        │
│ Host is up (0.0045s latency).          │
│ PORT    STATE SERVICE VERSION          │
│ 22/tcp  open  ssh     OpenSSH 8.0      │
│ 80/tcp  open  http    nginx 1.18       │
│ 443/tcp open  https   nginx 1.18       │
│                                         │
│ user@cyber-os:~$ _                     │
│                                         │
└─────────────────────────────────────────┘
```

### 9. Findings Management
```
┌──────────────────────────────────────────────────┐
│ FINDINGS & VULNERABILITY MANAGEMENT              │
├──────────────────────────────────────────────────┤
│ Filter: [All] [Critical] [High] [Medium] [Low]   │
│                                                  │
│ ┌────────────────────────────────────────────┐  │
│ │ SQL Injection in Login Form    │ CRITICAL │  │
│ │ Target: target.example.com     │ 9.8      │  │
│ │ Created: 2024-12-20            │ [Edit]   │  │
│ └────────────────────────────────────────────┘  │
│                                                  │
│ ┌────────────────────────────────────────────┐  │
│ │ XSS in User Profile        │ HIGH        │  │
│ │ Target: target.example.com │ 7.2         │  │
│ │ Created: 2024-12-19        │ [Edit]      │  │
│ └────────────────────────────────────────────┘  │
│                                                  │
│ ┌────────────────────────────────────────────┐  │
│ │ Weak Password Policy       │ MEDIUM      │  │
│ │ Target: target.example.com │ 5.3         │  │
│ │ Created: 2024-12-19        │ [Edit]      │  │
│ └────────────────────────────────────────────┘  │
│                                                  │
└──────────────────────────────────────────────────┘
```

### 10. Reporting
- Professional bug report generator
- CVSS calculator with scoring
- Severity classification system
- Markdown export functionality
- PDF export with branding
- Screenshot attachment manager

### 11. AI Security Assistant
```
┌────────────────────────────────────────┐
│ AI SECURITY ASSISTANT                  │
├────────────────────────────────────────┤
│                                        │
│ Assistant: How can I help you analyze  │
│ your findings today?                   │
│                                        │
│ You: Analyze this SQL injection        │
│                                        │
│ Assistant: Based on your finding,      │
│ this is a critical CVSS 9.8 issue...   │
│                                        │
│ Recommended remediation:               │
│ 1. Use parameterized queries           │
│ 2. Implement input validation          │
│ 3. Apply WAF rules                     │
│                                        │
│ [Message input field...]               │
│                                        │
└────────────────────────────────────────┘
```

## Color Scheme

### Professional Dark SOC Theme
- **Background**: Deep space black (`#020409`)
- **Primary Accent**: Neon cyan (`#00d4ff`)
- **Secondary Accent**: Neon green (`#00ffb4`)
- **Critical**: Bright red (`#ff6b6b`)
- **High**: Orange (`#ffa500`)
- **Medium**: Gold (`#ffd700`)
- **Text Primary**: Light blue (`#e8f0fe`)
- **Text Secondary**: Gray (`#6b7c99`)
- **Cards**: Glassmorphism with backdrop blur

## Visual Effects

✨ **Animations**
- Smooth fade-in transitions on page load
- Animated metric counters
- Hover effects on interactive elements
- Sliding sidebar with smooth transitions
- Chart data transitions

🎨 **UI Features**
- Glassmorphism cards with border glows
- Gradient backgrounds on hover
- Neon accent borders
- Responsive grid layouts
- Terminal-style typography

## Responsive Design

### Desktop (1920px+)
- Full sidebar navigation visible
- Multi-column layouts
- Large charts and data displays

### Tablet (768px - 1024px)
- Collapsible sidebar
- 2-column grid layouts
- Optimized touch interactions

### Mobile (< 768px)
- Bottom navigation or hamburger menu
- Single column layouts
- Scrollable components
- Touch-friendly buttons

## Data Display Examples

### Real Findings Data
```json
{
  "id": "finding_123",
  "title": "SQL Injection in Login Form",
  "severity": "critical",
  "cvss_score": 9.8,
  "target": "target.example.com",
  "description": "User input in password field is not sanitized...",
  "created_at": "2024-12-20T10:30:00Z",
  "status": "open"
}
```

### Real Scan Data
```json
{
  "id": "scan_456",
  "scan_type": "reconnaissance",
  "target": "target.example.com",
  "status": "completed",
  "results": {
    "subdomains_found": 24,
    "hosts_alive": 12,
    "services_discovered": 47,
    "technologies": ["nginx", "PHP", "MySQL"]
  },
  "created_at": "2024-12-20T09:15:00Z"
}
```

## Access Instructions

### Local Development
```bash
# Start the dev server
pnpm dev

# Access the dashboard
# Visit: http://localhost:3000/hidden-portal/dashboard
```

### Production Deployment
```bash
# Deploy to Vercel
vercel deploy

# Access the dashboard
# Visit: https://your-domain.vercel.app/hidden-portal/dashboard
```

## Live Feature Demonstrations

✅ Real-time dashboard updates via WebSocket
✅ Interactive terminal with command execution
✅ Real data from PostgreSQL database
✅ CVSS scoring calculations
✅ Severity-based finding categorization
✅ Responsive charts with Recharts
✅ Multi-tab terminal support
✅ Professional UI with Framer Motion animations
✅ Full TypeScript type safety
✅ Authentication with JWT tokens

---

**Status**: Production Ready ✅
**Real Data**: Yes ✅
**Mock Data**: None ✅
**Backend**: Fully Functional ✅
