#!/bin/bash

# Replace YOUR_GITHUB_USERNAME with your actual GitHub username
# Replace REPO_NAME with your repository name

echo "Setting up Git remote and pushing to GitHub..."

# Add your remote repository (replace with your actual URL)
# For HTTPS:
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/REPO_NAME.git

# For SSH (if you have SSH keys set up):
# git remote add origin git@github.com:YOUR_GITHUB_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main

echo "Repository pushed successfully!"