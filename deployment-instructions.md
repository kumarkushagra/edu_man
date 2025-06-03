# Deployment Instructions for Educational Web App

## Frontend Deployment on Vercel

### Step 1: Extract the Deployment Package
1. Extract the `eduapp_deployment_ready.tar.gz` file to your local machine

### Step 2: Create a GitHub Repository
1. Go to [GitHub](https://github.com) and sign in
2. Click on the "+" icon in the top right corner and select "New repository"
3. Name your repository (e.g., "eduapp-frontend")
4. Choose "Public" or "Private" visibility
5. Click "Create repository"

### Step 3: Push the Frontend Code to GitHub
```bash
cd path/to/extracted/eduapp/frontend
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/eduapp-frontend.git
git push -u origin main
```

### Step 4: Deploy to Vercel
1. Go to [Vercel](https://vercel.com) and sign in (create an account if needed)
2. Click "Add New" > "Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: .next
5. Add Environment Variables:
   - `NEXT_PUBLIC_API_URL`: URL of your backend API (you'll add this after backend deployment)
   - `JWT_SECRET`: A secure random string for JWT token generation
6. Click "Deploy"

## Backend Deployment on Render

### Step 1: Create a GitHub Repository for Backend
1. Go to [GitHub](https://github.com) and sign in
2. Click on the "+" icon and select "New repository"
3. Name your repository (e.g., "eduapp-backend")
4. Choose "Public" or "Private" visibility
5. Click "Create repository"

### Step 2: Push the Backend Code to GitHub
```bash
cd path/to/extracted/eduapp/backend
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/eduapp-backend.git
git push -u origin main
```

### Step 3: Set Up MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign in (create an account if needed)
2. Create a new cluster (free tier is sufficient)
3. Set up database access (create a user with password)
4. Set up network access (allow access from anywhere for development)
5. Get your connection string from the "Connect" button

### Step 4: Deploy Backend on Render
1. Go to [Render](https://render.com) and sign in (create an account if needed)
2. Click "New" > "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - Name: eduapp-backend
   - Runtime: Node
   - Build Command: npm install
   - Start Command: node src/index.js
   - Plan: Free
5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Same secret used in frontend
   - `NODE_ENV`: production
6. Click "Create Web Service"

### Step 5: Connect Frontend to Backend
1. Once your backend is deployed, copy the URL (e.g., https://eduapp-backend.onrender.com)
2. Go to your Vercel project settings
3. Add/update the `NEXT_PUBLIC_API_URL` environment variable with your backend URL
4. Redeploy your frontend if needed

## Testing Your Deployment
1. Visit your Vercel deployment URL
2. Test user registration and login
3. Verify that the application can connect to the backend
4. Test all major features (subject selection, chapter navigation, practice questions)

## Troubleshooting
- If the frontend can't connect to the backend, check CORS settings in the backend code
- If MongoDB connection fails, verify your connection string and network access settings
- For any deployment issues, check the logs in Vercel or Render dashboards
