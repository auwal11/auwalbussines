-- Offensive Cybersecurity OS - Complete Database Schema
-- This migration sets up all tables for the security operations center

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==================== USERS & AUTHENTICATION ====================

-- User profiles extending Supabase auth
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'analyst', -- analyst, admin, read_only
  team_id UUID,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- ==================== WORKSPACE & PROJECTS ====================

-- Teams/organizations
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  description TEXT,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects within teams
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  scope TEXT, -- In scope, Out of scope, etc
  status TEXT DEFAULT 'active', -- active, completed, on_hold
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  budget DECIMAL(10,2),
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, slug)
);

-- ==================== TARGETS & RECONNAISSANCE ====================

-- Targets to test (domains, IPs, applications)
CREATE TABLE IF NOT EXISTS targets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- domain, ip, mobile_app, web_app, api
  value TEXT NOT NULL, -- actual domain/IP/URL
  description TEXT,
  status TEXT DEFAULT 'active', -- active, completed, paused
  priority TEXT DEFAULT 'medium', -- low, medium, high, critical
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subdomains enumeration results
CREATE TABLE IF NOT EXISTS subdomains (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  target_id UUID NOT NULL REFERENCES targets(id) ON DELETE CASCADE,
  subdomain TEXT NOT NULL UNIQUE,
  discovered_by TEXT, -- tool name: subfinder, assetfinder, etc
  ip_addresses TEXT[],
  technologies TEXT[],
  http_status INT,
  is_alive BOOLEAN DEFAULT FALSE,
  cname_value TEXT,
  discovered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- DNS records
CREATE TABLE IF NOT EXISTS dns_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  target_id UUID NOT NULL REFERENCES targets(id) ON DELETE CASCADE,
  hostname TEXT NOT NULL,
  record_type TEXT NOT NULL, -- A, AAAA, CNAME, MX, TXT, NS, SOA, SRV
  record_value TEXT NOT NULL,
  ttl INT,
  is_critical BOOLEAN DEFAULT FALSE,
  discovered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- WHOIS information
CREATE TABLE IF NOT EXISTS whois_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  target_id UUID NOT NULL REFERENCES targets(id) ON DELETE CASCADE,
  registrar TEXT,
  registrant_name TEXT,
  registrant_email TEXT,
  registrant_org TEXT,
  creation_date TIMESTAMP WITH TIME ZONE,
  expiration_date TIMESTAMP WITH TIME ZONE,
  updated_date TIMESTAMP WITH TIME ZONE,
  nameservers TEXT[],
  raw_data JSONB,
  last_checked TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- HTTP fingerprinting and tech stack detection
CREATE TABLE IF NOT EXISTS tech_fingerprints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  target_id UUID NOT NULL REFERENCES targets(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  technologies JSONB, -- {name, version, category, icon, website}
  headers JSONB,
  cookies TEXT[],
  meta_tags JSONB,
  cms TEXT,
  framework TEXT,
  language TEXT,
  web_server TEXT,
  database TEXT,
  reverse_proxies TEXT[],
  javascript_frameworks TEXT[],
  analyzed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Live hosts discovery
CREATE TABLE IF NOT EXISTS live_hosts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  target_id UUID NOT NULL REFERENCES targets(id) ON DELETE CASCADE,
  host_ip TEXT NOT NULL,
  host_name TEXT,
  response_time INT, -- milliseconds
  ttl INT,
  status TEXT DEFAULT 'active', -- active, down
  discovered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== PORTS & SERVICES ====================

-- Port scanning results
CREATE TABLE IF NOT EXISTS port_scans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  target_id UUID NOT NULL REFERENCES targets(id) ON DELETE CASCADE,
  host_ip TEXT NOT NULL,
  port INT NOT NULL,
  protocol TEXT NOT NULL, -- tcp, udp
  state TEXT NOT NULL, -- open, closed, filtered
  service TEXT,
  version TEXT,
  banner TEXT,
  cpe TEXT,
  cvss_score DECIMAL(3,1),
  scanned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(target_id, host_ip, port, protocol)
);

-- Service enumeration details
CREATE TABLE IF NOT EXISTS service_details (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  scan_id UUID NOT NULL REFERENCES port_scans(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL, -- SMB, LDAP, SSH, FTP, HTTP, etc
  details JSONB, -- service-specific data
  authentication_available BOOLEAN,
  default_credentials TEXT[],
  vulnerabilities TEXT[],
  enumerated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== VULNERABILITIES & FINDINGS ====================

-- Security findings/vulnerabilities discovered
CREATE TABLE IF NOT EXISTS findings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  target_id UUID REFERENCES targets(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  finding_type TEXT NOT NULL, -- injection, xss, auth_bypass, etc
  severity TEXT NOT NULL, -- critical, high, medium, low, info
  cvss_score DECIMAL(3,1),
  cvss_vector TEXT,
  cwe_id TEXT,
  cve_id TEXT,
  owasp_category TEXT,
  affected_component TEXT,
  affected_endpoint TEXT,
  affected_parameter TEXT,
  proof_of_concept TEXT,
  remediation TEXT,
  remediation_difficulty TEXT, -- trivial, low, medium, high
  discovered_by UUID NOT NULL REFERENCES auth.users(id),
  status TEXT DEFAULT 'open', -- open, in_progress, resolved, false_positive, accepted_risk
  assigned_to UUID REFERENCES auth.users(id),
  due_date TIMESTAMP WITH TIME ZONE,
  tags TEXT[] DEFAULT '{}',
  attachments JSONB DEFAULT '[]', -- {filename, url, created_at}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Evidence for findings
CREATE TABLE IF NOT EXISTS finding_evidence (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  finding_id UUID NOT NULL REFERENCES findings(id) ON DELETE CASCADE,
  evidence_type TEXT NOT NULL, -- screenshot, log, request_response, packet_capture
  file_url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== SCANS & AUTOMATION ====================

-- Security scans (recon, port scan, vuln scan, etc)
CREATE TABLE IF NOT EXISTS scans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  target_id UUID REFERENCES targets(id) ON DELETE SET NULL,
  scan_type TEXT NOT NULL, -- subdomain_enum, port_scan, tech_detect, api_scan, web_scan
  tool_name TEXT, -- subfinder, nmap, httpx, nuclei, burp, etc
  status TEXT DEFAULT 'pending', -- pending, running, completed, failed
  progress INT DEFAULT 0, -- 0-100
  parameters JSONB, -- scan-specific parameters
  results JSONB, -- raw scan results
  findings_count INT DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  executed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Automation workflows
CREATE TABLE IF NOT EXISTS automation_workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  workflow_yaml TEXT NOT NULL, -- YAML definition of the workflow
  trigger_type TEXT, -- manual, scheduled, on_discovery
  schedule_cron TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  last_executed TIMESTAMP WITH TIME ZONE,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Automation task logs
CREATE TABLE IF NOT EXISTS automation_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workflow_id UUID NOT NULL REFERENCES automation_workflows(id) ON DELETE CASCADE,
  status TEXT NOT NULL, -- pending, running, success, failed
  output TEXT,
  error_message TEXT,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  duration_ms INT
);

-- ==================== EXPLOITATION & POST-EXPLOITATION ====================

-- Reverse shell sessions
CREATE TABLE IF NOT EXISTS reverse_shells (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  target_id UUID REFERENCES targets(id) ON DELETE SET NULL,
  session_id TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'active', -- active, dormant, terminated
  remote_ip TEXT NOT NULL,
  remote_port INT NOT NULL,
  local_ip TEXT,
  local_port INT,
  shell_type TEXT, -- bash, sh, powershell, cmd
  user_context TEXT,
  privilege_level TEXT, -- user, administrator, root
  command_history JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lateral movement mapping
CREATE TABLE IF NOT EXISTS lateral_movements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  source_host TEXT NOT NULL,
  target_host TEXT NOT NULL,
  method TEXT NOT NULL, -- psexec, wmi, ssh, scp, rdp, etc
  credentials_used TEXT,
  success BOOLEAN DEFAULT FALSE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Persistence mechanisms
CREATE TABLE IF NOT EXISTS persistence_mechanisms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  target_id UUID REFERENCES targets(id) ON DELETE SET NULL,
  mechanism_type TEXT NOT NULL, -- scheduled_task, service, registry, cron, ssh_key, backdoor_account
  location TEXT,
  description TEXT,
  detection_difficulty TEXT, -- trivial, low, medium, high
  eradication_steps TEXT,
  discovered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Data inventory for collected artifacts
CREATE TABLE IF NOT EXISTS data_artifacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  artifact_type TEXT NOT NULL, -- credentials, files, database_dump, config, logs
  description TEXT,
  location TEXT,
  file_url TEXT,
  file_size INT,
  is_sensitive BOOLEAN DEFAULT TRUE,
  encryption_status TEXT, -- encrypted, plaintext
  collected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activity timeline for auditing
CREATE TABLE IF NOT EXISTS activity_timeline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  action_type TEXT NOT NULL, -- scan_started, finding_created, shell_opened, command_executed, etc
  resource_type TEXT, -- finding, scan, target, report
  resource_id UUID,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== REPORTS & DOCUMENTATION ====================

-- Security reports
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  report_type TEXT NOT NULL, -- executive_summary, technical_findings, full_assessment
  status TEXT DEFAULT 'draft', -- draft, in_review, finalized
  findings_summary JSONB, -- {critical, high, medium, low, info}
  affected_systems TEXT[],
  risk_rating TEXT, -- critical, high, medium, low
  executive_summary TEXT,
  technical_details TEXT,
  recommendations TEXT,
  markdown_content TEXT,
  pdf_url TEXT,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  finalized_at TIMESTAMP WITH TIME ZONE
);

-- Report attachments (screenshots, evidence)
CREATE TABLE IF NOT EXISTS report_attachments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  file_size INT,
  description TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== NOTES & DOCUMENTATION ====================

-- Project notes/documentation
CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT FALSE,
  tags TEXT[] DEFAULT '{}',
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== API TESTING & WEB EXPLOITATION ====================

-- Request templates for API testing
CREATE TABLE IF NOT EXISTS request_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  method TEXT NOT NULL, -- GET, POST, PUT, DELETE, PATCH
  url TEXT NOT NULL,
  headers JSONB,
  body TEXT,
  variables JSONB, -- for templating: {name, default_value}
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payload libraries
CREATE TABLE IF NOT EXISTS payload_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- xss, sqli, ssti, rce, auth_bypass, path_traversal
  payload TEXT NOT NULL,
  description TEXT,
  severity TEXT,
  tags TEXT[] DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- JWT testing records
CREATE TABLE IF NOT EXISTS jwt_tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  algorithm TEXT,
  header JSONB,
  payload JSONB,
  signature TEXT,
  is_valid BOOLEAN,
  vulnerabilities TEXT[],
  tested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================== INDEXES ====================

CREATE INDEX idx_user_profiles_team_id ON user_profiles(team_id);
CREATE INDEX idx_projects_team_id ON projects(team_id);
CREATE INDEX idx_targets_project_id ON targets(project_id);
CREATE INDEX idx_findings_project_id ON findings(project_id);
CREATE INDEX idx_findings_target_id ON findings(target_id);
CREATE INDEX idx_findings_status ON findings(status);
CREATE INDEX idx_findings_severity ON findings(severity);
CREATE INDEX idx_scans_project_id ON scans(project_id);
CREATE INDEX idx_scans_status ON scans(status);
CREATE INDEX idx_subdomains_target_id ON subdomains(target_id);
CREATE INDEX idx_port_scans_target_id ON port_scans(target_id);
CREATE INDEX idx_reverse_shells_project_id ON reverse_shells(project_id);
CREATE INDEX idx_activity_timeline_project_id ON activity_timeline(project_id);
CREATE INDEX idx_reports_project_id ON reports(project_id);

-- ==================== ENABLE ROW LEVEL SECURITY ====================

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE findings ENABLE ROW LEVEL SECURITY;
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for teams (only members can access)
CREATE POLICY "Users can view their own team" ON teams
  FOR SELECT USING (owner_id = auth.uid() OR id IN (
    SELECT team_id FROM user_profiles WHERE id = auth.uid()
  ));

-- RLS Policies for projects (only team members can access)
CREATE POLICY "Users can view projects in their team" ON projects
  FOR SELECT USING (team_id IN (
    SELECT id FROM teams WHERE owner_id = auth.uid() OR id IN (
      SELECT team_id FROM user_profiles WHERE id = auth.uid()
    )
  ));

-- RLS Policies for findings
CREATE POLICY "Users can view findings in their projects" ON findings
  FOR SELECT USING (project_id IN (
    SELECT id FROM projects WHERE team_id IN (
      SELECT id FROM teams WHERE owner_id = auth.uid()
    )
  ));
