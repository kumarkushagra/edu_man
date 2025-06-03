# Vercel Deployment Guide

This guide will walk you through deploying your educational web application on Vercel's free plan.

## Step 1: Prepare Your GitHub Repository

1. Create a new GitHub repository
2. Push your frontend code to this repository
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

## Step 2: Connect Vercel to Your GitHub Repository

1. Go to [Vercel](https://vercel.com/) and sign up or log in
2. Click "Add New" > "Project"
3. Import your GitHub repository
4. Vercel will automatically detect that it's a Next.js project

## Step 3: Configure Project Settings

1. Project Name: Enter a name for your project
2. Framework Preset: Ensure "Next.js" is selected
3. Root Directory: Leave as `.` if your repository contains only the frontend code
4. Build Command: Leave as default (`next build`)
5. Output Directory: Leave as default (`.next`)
6. Install Command: Leave as default (`npm install`)

## Step 4: Configure Environment Variables

1. Expand the "Environment Variables" section
2. Add the following variables:
   - `NEXT_PUBLIC_API_URL`: URL of your backend API
   - `JWT_SECRET`: Secret key for JWT token generation
   - `MONGODB_URI`: MongoDB connection string (from MongoDB Atlas)
   - `GMAIL_APP_CODE`: (Optional) Gmail app code for email notifications
   - `GEMINI_API_KEY`: (Optional) Gemini API key for AI features

## Step 5: Deploy

1. Click "Deploy"
2. Wait for the build and deployment to complete
3. Vercel will provide you with a deployment URL (e.g., `https://your-project.vercel.app`)

## Step 6: Verify Deployment

1. Visit your deployment URL
2. Check that the application loads correctly
3. Test authentication functionality
4. Verify that API calls are working properly

## Step 7: Set Up Custom Domain (Optional)

1. In your Vercel dashboard, go to your project
2. Click on "Settings" > "Domains"
3. Add your custom domain
4. Follow Vercel's instructions to configure DNS settings

## Troubleshooting Common Issues

### API Connection Issues

- Ensure your backend is deployed and accessible
- Check that `NEXT_PUBLIC_API_URL` is correctly set
- Verify CORS settings on your backend

### MongoDB Connection Issues

- Ensure your MongoDB Atlas cluster is running
- Verify that the connection string is correct
- Check that your IP whitelist includes Vercel's IPs

### Authentication Issues

- Ensure `JWT_SECRET` is the same on both frontend and backend
- Check that token generation and verification are working

## Continuous Deployment

Vercel automatically sets up continuous deployment:

1. Any push to your main branch will trigger a new deployment
2. You can configure preview deployments for pull requests
3. You can roll back to previous deployments if needed

## Monitoring and Logs

1. In your Vercel dashboard, go to your project
2. Click on "Analytics" to view performance metrics
3. Click on "Logs" to view deployment and runtime logs

Remember that the frontend deployed on Vercel will need to connect to your backend API, which should be deployed on a separate service that supports Node.js/Express applications.
