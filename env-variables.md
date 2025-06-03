# Environment Variables Guide

This document outlines all the environment variables needed for your educational web application.

## Frontend Environment Variables (Vercel)

| Variable Name | Description | Required | Default Fallback |
|---------------|-------------|----------|-----------------|
| `NEXT_PUBLIC_API_URL` | URL of your backend API | Yes | http://localhost:5000/api |
| `JWT_SECRET` | Secret key for JWT token generation | Yes | dev_jwt_secret (in dev only) |
| `MONGODB_URI` | MongoDB connection string | No | mongodb://localhost:27017/eduapp |
| `GMAIL_APP_CODE` | Gmail app code for email notifications | No | Empty string |
| `GEMINI_API_KEY` | Gemini API key for AI features | No | null |

## Backend Environment Variables

| Variable Name | Description | Required | Default Fallback |
|---------------|-------------|----------|-----------------|
| `MONGODB_URI` | MongoDB connection string | Yes | mongodb://localhost:27017/eduapp |
| `JWT_SECRET` | Secret key for JWT token verification (must match frontend) | Yes | dev_jwt_secret (in dev only) |
| `PORT` | Port for backend server | No | 5000 |
| `NODE_ENV` | Environment (development/production) | No | development |

## How to Set Environment Variables

### For Local Development
Create a `.env.local` file in the frontend directory with:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
JWT_SECRET=your_secret_key
```

Create a `.env` file in the backend directory with:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development
```

### For Vercel Deployment
When deploying to Vercel, add these environment variables in the Vercel project settings:
1. Go to your Vercel dashboard
2. Select your project
3. Click on "Settings" tab
4. Navigate to "Environment Variables" section
5. Add each variable with its corresponding value

### For Backend Deployment
Add these environment variables in your chosen backend hosting platform (Render, Railway, etc.):
1. Go to your project settings
2. Find the environment variables or secrets section
3. Add each variable with its corresponding value

## Failsafe Mechanisms

The application includes failsafe mechanisms to handle missing environment variables:

- If `NEXT_PUBLIC_API_URL` is missing, the app will default to localhost in development
- If `MONGODB_URI` is missing, the app will attempt to connect to a local MongoDB instance
- If `JWT_SECRET` is missing in development, a default secret will be used (not secure for production)
- If `GMAIL_APP_CODE` is missing, email notification features will be disabled
- If `GEMINI_API_KEY` is missing, AI-enhanced features will be disabled
