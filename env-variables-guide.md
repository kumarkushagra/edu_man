# Environment Variables Guide for Vercel Deployment

This document provides a comprehensive list of environment variables needed for your educational web application deployment on Vercel.

## Required Environment Variables

### Frontend (Vercel)

| Variable Name | Description | Required | Default Fallback |
|---------------|-------------|----------|-----------------|
| `NEXT_PUBLIC_API_URL` | URL of your backend API | Yes | http://localhost:5000/api |
| `JWT_SECRET` | Secret key for JWT token generation | Yes | dev_jwt_secret (in dev only) |

### Backend (Separate Deployment)

| Variable Name | Description | Required | Default Fallback |
|---------------|-------------|----------|-----------------|
| `MONGODB_URI` | MongoDB connection string | Yes | mongodb://localhost:27017/eduapp |
| `JWT_SECRET` | Secret key for JWT token verification (must match frontend) | Yes | dev_jwt_secret (in dev only) |
| `PORT` | Port for backend server | No | 5000 |
| `NODE_ENV` | Environment (development/production) | No | development |

### Optional Services

| Variable Name | Description | Required | Default Fallback |
|---------------|-------------|----------|-----------------|
| `GMAIL_APP_CODE` | Gmail app code for email notifications | No | Empty string |
| `GEMINI_API_KEY` | Gemini API key for AI features | No | null |

## How to Add Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Click on "Settings" tab
4. Navigate to "Environment Variables" section
5. Add each variable with its corresponding value
6. Make sure to select the appropriate environments (Production, Preview, Development)
7. Click "Save" to apply the changes

## Failsafe Mechanisms

The application includes failsafe mechanisms to handle missing environment variables:

- If `NEXT_PUBLIC_API_URL` is missing, the app will default to localhost in development
- If `MONGODB_URI` is missing, the app will attempt to connect to a local MongoDB instance
- If `JWT_SECRET` is missing in development, a default secret will be used (not secure for production)
- If `GMAIL_APP_CODE` is missing, email notification features will be disabled
- If `GEMINI_API_KEY` is missing, AI-enhanced features will be disabled

## Backend Deployment Options

Since Vercel's free plan doesn't support Express.js backends, consider these alternatives:

1. **Render** (https://render.com) - Free tier available
2. **Railway** (https://railway.app) - Free tier available
3. **Heroku** (https://heroku.com) - Free tier available
4. **Fly.io** (https://fly.io) - Free tier available

When deploying the backend, make sure to set the same environment variables listed above in your chosen platform's dashboard.

## MongoDB Atlas Setup

For MongoDB Atlas:

1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Set up a database user with read/write permissions
3. Whitelist all IP addresses (0.0.0.0/0) for development
4. Get your connection string in the format: `mongodb+srv://username:password@cluster.mongodb.net/eduapp?retryWrites=true&w=majority`
5. Add this as the `MONGODB_URI` environment variable in both your frontend and backend deployments
