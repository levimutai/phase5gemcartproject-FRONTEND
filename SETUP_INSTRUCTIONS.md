# GemCart-Phase5-Project Setup Instructions

## Initial Setup (Project Lead)

```bash
# 1. Initialize repository
git init
git add .
git commit -m "Initial project setup"

# 2. Create develop branch
git checkout -b develop
git push -u origin develop

# 3. Create team branches
git checkout -b frontend/setup
git checkout -b backend/setup  
git checkout -b database/setup
git checkout -b testing/setup

# 4. Push all branches
git push -u origin frontend/setup
git push -u origin backend/setup
git push -u origin database/setup
git push -u origin testing/setup
```

## Team Member Setup

```bash
# 1. Clone repository
git clone https://github.com/levimutai/GemCart-Phase5-Project.git
cd GemCart-Phase5-Project

# 2. Checkout your team branch
git checkout [your-team-branch]

# 3. Install dependencies
npm install                    # Frontend
cd backend && pip install -r requirements.txt  # Backend

# 4. Create your feature branch
git checkout -b [team]/[your-feature]
```

## Daily Workflow

```bash
# 1. Pull latest changes
git checkout develop
git pull origin develop

# 2. Update your branch
git checkout [your-branch]
git merge develop

# 3. Work on your feature
# ... make changes ...

# 4. Commit and push
git add .
git commit -m "feat: your feature description"
git push origin [your-branch]

# 5. Create Pull Request to develop
```

## Environment Setup

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENVIRONMENT=development
```

### Backend (.env)
```
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=jwt-secret
```