# Backend Deployment Guide

This guide will help you deploy your Express.js backend for the educational web application.

## Option 1: Render (Recommended for Free Tier)

### Step 1: Prepare Your Backend Repository

1. Create a new GitHub repository for your backend code
2. Push your backend code to this repository
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-backend-repo.git
   git push -u origin main
   ```

### Step 2: Sign Up for Render

1. Go to [Render](https://render.com/) and sign up or log in
2. Click "New" > "Web Service"
3. Connect your GitHub account and select your backend repository

### Step 3: Configure Web Service

1. Name: Enter a name for your service
2. Runtime: Select "Node"
3. Build Command: `npm install`
4. Start Command: `node src/index.js`
5. Select the free plan

### Step 4: Add Environment Variables

1. Scroll down to the "Environment" section
2. Add the following variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Same secret key used in your frontend
   - `PORT`: `10000` (Render assigns its own port via `PORT` env var)
   - `NODE_ENV`: `production`
   - Other optional variables as needed

### Step 5: Deploy

1. Click "Create Web Service"
2. Wait for the build and deployment to complete
3. Render will provide you with a deployment URL (e.g., `https://your-backend.onrender.com`)

## Option 2: Railway

### Step 1: Sign Up for Railway

1. Go to [Railway](https://railway.app/) and sign up or log in
2. Click "New Project" > "Deploy from GitHub repo"
3. Connect your GitHub account and select your backend repository

### Step 2: Configure Project

1. Railway will automatically detect Node.js
2. Add the following environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Same secret key used in your frontend
   - `NODE_ENV`: `production`
   - Other optional variables as needed

### Step 3: Deploy

1. Railway will automatically build and deploy your application
2. You'll get a deployment URL to use as your API endpoint

## Option 3: Fly.io

### Step 1: Install Flyctl

1. Install the Fly.io CLI tool according to your operating system
2. Run `flyctl auth login` to authenticate

### Step 2: Initialize Your App

1. Navigate to your backend directory
2. Run `flyctl launch`
3. Follow the prompts to configure your app
4. When asked about a Postgres database, select "No"

### Step 3: Configure Environment Variables

1. Run `flyctl secrets set MONGODB_URI="your-mongodb-uri"`
2. Run `flyctl secrets set JWT_SECRET="your-jwt-secret"`
3. Add any other environment variables needed

### Step 4: Deploy

1. Run `flyctl deploy`
2. Wait for the deployment to complete
3. Fly.io will provide you with a deployment URL

## Connecting Your Backend to Frontend

Once your backend is deployed:

1. Copy the deployment URL (e.g., `https://your-backend.onrender.com`)
2. Add this URL as the `NEXT_PUBLIC_API_URL` environment variable in your Vercel deployment
3. Make sure to append `/api` to the URL if your routes are prefixed with `/api`

## Verifying Backend Deployment

1. Test your backend API using a tool like Postman or curl
2. Try accessing a public endpoint, such as `https://your-backend.onrender.com/api/health` (if implemented)
3. Check the logs in your deployment platform for any errors

## Troubleshooting

### CORS Issues

If you encounter CORS errors, ensure your backend has proper CORS configuration:

```javascript
const cors = require('cors');

// Use CORS middleware with appropriate configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Connection Issues

If your frontend cannot connect to your backend:
1. Verify the backend is running (check deployment logs)
2. Ensure the `NEXT_PUBLIC_API_URL` is correctly set in Vercel
3. Check that your backend is properly handling requests

### MongoDB Connection Issues

If your backend cannot connect to MongoDB:
1. Verify your MongoDB Atlas connection string
2. Ensure your IP whitelist in MongoDB Atlas includes your backend deployment's IP
3. Check your backend logs for connection errors
