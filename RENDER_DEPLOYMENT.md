# Render.com Deployment Guide for StockMaster

## Prerequisites

1. GitHub account with your repository
2. Render.com account (sign up at https://render.com)
3. Repository pushed to GitHub

## Deployment Steps

### 1. Connect Repository to Render

1. Go to https://dashboard.render.com
2. Click "New +" → "Blueprint"
3. Connect your GitHub account
4. Select the `stockmaster` repository
5. Click "Connect"

### 2. Render will automatically detect `render.yaml` and create:

- **stockmaster-api** (Backend Web Service) - Python FastAPI app
- **stockmaster-frontend** (Frontend Static Site) - React Vite app
- **stockmaster-db** (PostgreSQL Database) - Free tier PostgreSQL

### 3. Configure Environment Variables

#### Backend Service (stockmaster-api):

Render will auto-generate most variables from render.yaml, but verify:

- `SECRET_KEY` - Auto-generated ✓
- `ENVIRONMENT` - Set to "production" ✓
- `DATABASE_URL` - Auto-connected from database ✓
- `FRONTEND_URL` - Auto-set ✓

**Optional SMTP Configuration** (for OTP password reset emails):
Add these manually in Render Dashboard:

- `SMTP_HOST` = `smtp.gmail.com`
- `SMTP_PORT` = `587`
- `SMTP_USER` = your email address
- `SMTP_PASSWORD` = your Gmail app password
- `SMTP_FROM` = `noreply@stockmaster.com`

#### Frontend Service (stockmaster-frontend):

- `VITE_API_URL` - **MUST BE SET MANUALLY**
  1. Wait for backend deployment to complete
  2. Copy the backend URL (e.g., `https://stockmaster-api.onrender.com`)
  3. Go to Frontend service → Environment
  4. Set `VITE_API_URL` to the backend URL
  5. Click "Save Changes" (triggers rebuild)

### 4. Deployment Process

1. Render reads `render.yaml` blueprint
2. Database creates first (stockmaster-db)
3. Backend deploys (stockmaster-api) - connects to database
4. Frontend deploys (stockmaster-frontend) - **YOU MUST SET VITE_API_URL**

### 5. Post-Deployment Configuration

#### Set Frontend API URL:

```
1. Backend finishes deployment → Copy URL
2. Go to Frontend service → Environment tab
3. Add/Edit: VITE_API_URL = https://stockmaster-api.onrender.com
4. Save (auto-triggers rebuild)
```

#### Create Admin User:

After backend is running, create an admin user via Render Shell:

```bash
# Go to stockmaster-api service → Shell tab
cd backend
python create_admin.py
```

### 6. Access Your Application

- Frontend: `https://stockmaster-frontend.onrender.com`
- Backend API: `https://stockmaster-api.onrender.com`
- API Docs: `https://stockmaster-api.onrender.com/docs`

### 7. Default Admin Login

After running `create_admin.py`:

- **Email**: `admin@stockmaster.com`
- **Password**: `admin123`

**⚠️ CHANGE THIS PASSWORD IMMEDIATELY IN PRODUCTION!**

## Important Notes

### Free Tier Limitations:

- Services spin down after 15 minutes of inactivity
- First request may take 30-60 seconds (cold start)
- Database limited to 1 GB storage
- 750 hours/month per service

### SMTP Configuration:

- **Gmail App Password**: Use App-Specific Password, not regular password
  - Go to: Google Account → Security → 2-Step Verification → App passwords
- Without SMTP, password reset won't work (login/signup still functional)

### Database Persistence:

- PostgreSQL database data persists across deployments
- Run migrations manually if schema changes: `alembic upgrade head` (if using Alembic)

## Troubleshooting

### Frontend can't reach backend:

✓ Check `VITE_API_URL` in frontend environment variables
✓ Ensure backend is deployed and healthy
✓ Check CORS settings in `backend/main.py`

### Database connection errors:

✓ Verify `DATABASE_URL` is set (auto-generated)
✓ Check database is "Available" in Render dashboard
✓ Look at backend service logs for connection errors

### Build failures:

✓ **Backend**: Check `backend/requirements.txt` has all dependencies
✓ **Frontend**: Verify `package.json` scripts exist (`build`, `preview`)
✓ Check build logs in Render dashboard

### Cold starts taking too long:

✓ Upgrade to paid plan ($7/month) for always-on instances
✓ Use cron-job.org to ping your app every 10 minutes (keep it warm)

## Manual Updates

### Update backend code:

```bash
git add .
git commit -m "Update backend"
git push origin main
```

Render auto-deploys on push.

### Update frontend code:

```bash
git add .
git commit -m "Update frontend"
git push origin main
```

**Remember**: If API URL changes, update `VITE_API_URL` in frontend env vars!

## Environment Variables Reference

| Service  | Variable        | Source              | Required |
| -------- | --------------- | ------------------- | -------- |
| Backend  | `SECRET_KEY`    | Auto-generated      | ✓        |
| Backend  | `ENVIRONMENT`   | render.yaml         | ✓        |
| Backend  | `DATABASE_URL`  | Database connection | ✓        |
| Backend  | `FRONTEND_URL`  | Auto-set            | ✓        |
| Backend  | `SMTP_HOST`     | Manual              | Optional |
| Backend  | `SMTP_PORT`     | Manual              | Optional |
| Backend  | `SMTP_USER`     | Manual              | Optional |
| Backend  | `SMTP_PASSWORD` | Manual              | Optional |
| Backend  | `SMTP_FROM`     | Manual              | Optional |
| Frontend | `VITE_API_URL`  | **MANUAL REQUIRED** | ✓        |

## Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] Connected repository to Render (Blueprint)
- [ ] All 3 services deployed (api, frontend, db)
- [ ] Backend is "Live" and healthy
- [ ] **Set `VITE_API_URL` in frontend environment**
- [ ] Frontend rebuilt after setting API URL
- [ ] Ran `create_admin.py` in backend shell
- [ ] Can login at frontend URL
- [ ] Tested creating products/warehouses
- [ ] (Optional) Configured SMTP for password reset

## Support

- Render Docs: https://render.com/docs
- FastAPI Docs: https://fastapi.tiangolo.com
- Vite Docs: https://vitejs.dev

---

**Quick Deploy Command:**

```bash
# Just push to GitHub, Render handles the rest
git add .
git commit -m "Deploy to Render"
git push origin main
```

Then manually set `VITE_API_URL` in frontend service environment variables!
