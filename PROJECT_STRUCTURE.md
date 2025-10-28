# GemCart-Phase5-Project Group Structure

## Team Responsibilities

### Frontend Team
- **Branch**: `frontend/[feature-name]`
- **Responsibilities**: React components, routing, UI/UX, state management

### Backend Team  
- **Branch**: `backend/[feature-name]`
- **Responsibilities**: Flask API, database models, authentication, business logic

### Database Team
- **Branch**: `database/[feature-name]` 
- **Responsibilities**: Database design, migrations, seed data, relationships

### Testing/DevOps Team
- **Branch**: `testing/[feature-name]`
- **Responsibilities**: Unit tests, integration tests, deployment, CI/CD

## Branch Structure
```
main (production-ready code)
├── develop (integration branch)
├── frontend/
│   ├── frontend/components
│   ├── frontend/pages
│   ├── frontend/context
│   └── frontend/styling
├── backend/
│   ├── backend/auth
│   ├── backend/api
│   ├── backend/models
│   └── backend/validation
├── database/
│   ├── database/schema
│   ├── database/migrations
│   └── database/seeders
└── testing/
    ├── testing/unit
    ├── testing/integration
    └── testing/deployment
```

## Workflow
1. Create feature branch from `develop`
2. Work on your assigned feature
3. Create Pull Request to `develop`
4. Code review by team
5. Merge to `develop`
6. Deploy `develop` to `main` when ready