#!/bin/bash

# Offensive Cybersecurity OS - Repository Setup Script
# This script creates a new repository and pushes all code

set -e

echo "🔐 Offensive Cybersecurity OS - Repository Setup"
echo "=================================================="
echo ""

# Configuration
GITHUB_ORG="auwntech-audit"
REPO_NAME="cyber-os-platform"
REPO_DESCRIPTION="Production-grade offensive security operations center with real-time reconnaissance, exploitation, and reporting tools"

echo "📦 Repository Configuration:"
echo "  Organization: $GITHUB_ORG"
echo "  Repository: $REPO_NAME"
echo "  URL: https://github.com/$GITHUB_ORG/$REPO_NAME"
echo ""

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo "Install it from: https://cli.github.com"
    exit 1
fi

echo "✅ GitHub CLI found"
echo ""

# Check authentication
echo "🔑 Checking GitHub authentication..."
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub"
    echo "Run: gh auth login"
    exit 1
fi

echo "✅ Authenticated with GitHub"
echo ""

# Create repository
echo "🚀 Creating repository..."
if gh repo list $GITHUB_ORG | grep -q "^$GITHUB_ORG/$REPO_NAME"; then
    echo "ℹ️  Repository already exists"
else
    gh repo create "$GITHUB_ORG/$REPO_NAME" \
        --description "$REPO_DESCRIPTION" \
        --public \
        --source=. \
        --remote=origin \
        --push
    echo "✅ Repository created successfully"
fi

echo ""
echo "🔗 Configuring git remote..."

# Add or update remote
cd /vercel/share/v0-project

if git remote | grep -q "^origin$"; then
    git remote set-url origin "https://github.com/$GITHUB_ORG/$REPO_NAME.git"
    echo "✅ Updated existing remote"
else
    git remote add origin "https://github.com/$GITHUB_ORG/$REPO_NAME.git"
    echo "✅ Added new remote"
fi

echo ""
echo "📤 Pushing to main branch..."
git push -u origin master:main --force

echo ""
echo "✅ Successfully created and pushed!"
echo ""
echo "📊 Repository Details:"
echo "  URL: https://github.com/$GITHUB_ORG/$REPO_NAME"
echo "  Branch: main"
echo "  Website: https://$REPO_NAME.vercel.app"
echo ""
echo "🎯 Next Steps:"
echo "  1. Visit the repository: https://github.com/$GITHUB_ORG/$REPO_NAME"
echo "  2. Deploy to Vercel: https://vercel.com/new"
echo "  3. Configure environment variables in Vercel dashboard"
echo "  4. Access the Cyber OS at https://$REPO_NAME.vercel.app/hidden-portal/dashboard"
echo ""
