@echo off
echo Setting up GemCart-Phase5-Project repository...

echo Initializing git...
git init

echo Creating branches...
git checkout -b develop
git checkout -b frontend/main
git checkout -b backend/main
git checkout -b database/main
git checkout -b testing/main

echo Adding files...
git checkout main
git add .
git commit -m "Initial GemCart-Phase5-Project setup"

echo Switching to develop branch...
git checkout develop

echo Setup complete! 
echo Next steps:
echo 1. Create GitHub repository
echo 2. git remote add origin https://github.com/levimutai/GemCart-Phase5-Project.git
echo 3. git push -u origin --all
echo 4. Share repository with team members

pause