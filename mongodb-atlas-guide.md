# MongoDB Atlas Setup Guide

This guide will help you set up a MongoDB Atlas cluster for your educational web application.

## Step 1: Create a MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free" or "Sign Up" to create a new account
3. Complete the registration process

## Step 2: Create a Free Cluster

1. After logging in, click "Build a Database"
2. Select "FREE" tier (M0 Sandbox)
3. Choose a cloud provider (AWS, Google Cloud, or Azure) and a region closest to your users
4. Click "Create Cluster" (this may take a few minutes to provision)

## Step 3: Set Up Database Access

1. In the left sidebar, click "Database Access" under SECURITY
2. Click "Add New Database User"
3. Choose "Password" authentication method
4. Enter a username and a secure password (save these credentials)
5. Under "Database User Privileges", select "Atlas admin" for simplicity
6. Click "Add User"

## Step 4: Configure Network Access

1. In the left sidebar, click "Network Access" under SECURITY
2. Click "Add IP Address"
3. For development, you can click "Allow Access from Anywhere" (0.0.0.0/0)
   - Note: For production, you should restrict this to specific IP addresses
4. Click "Confirm"

## Step 5: Get Your Connection String

1. In the left sidebar, click "Database" under DEPLOYMENTS
2. Click "Connect" on your cluster
3. Select "Connect your application"
4. Choose "Node.js" as your driver and the appropriate version
5. Copy the connection string that looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<username>` and `<password>` with your database user credentials
7. Add your database name to the URI (e.g., `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/eduapp?retryWrites=true&w=majority`)

## Step 6: Create Initial Database Structure

For a clean setup, you may want to create the initial collections:

1. In the left sidebar, click "Database" under DEPLOYMENTS
2. Click "Browse Collections" on your cluster
3. Click "Add My Own Data"
4. Enter "eduapp" as the database name
5. Enter "users" as the first collection name
6. Click "Create"
7. Repeat to create additional collections:
   - subjects
   - chapters
   - content
   - questions
   - progress
   - sessions

## Step 7: Add Connection String to Environment Variables

1. Add your MongoDB connection string as the `MONGODB_URI` environment variable in:
   - Your backend deployment platform
   - Vercel (for the frontend)

## Failsafe Implementation

The application has been designed with failsafe mechanisms:

- If the MongoDB connection fails, the application will display appropriate error messages
- The frontend will store progress data locally if the backend is unavailable
- Local data will be synced when the connection is restored

## Testing Your Connection

To test your MongoDB connection:

1. In your backend code, ensure you're using the connection string with proper error handling
2. Monitor the Atlas dashboard for connection activity
3. Check your application logs for successful connection messages

Remember to keep your MongoDB Atlas credentials secure and never commit them to your code repository.
