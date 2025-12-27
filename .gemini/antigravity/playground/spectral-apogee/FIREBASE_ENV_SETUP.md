# Firebase Environment Setup

## Required Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

## How to Get These Values

### Option 1: Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`gearguard-track-app`)
3. Click on the gear icon (Settings) > Project settings
4. Scroll down to "Your apps" section
5. If no web app exists, click "Add app" > Web
6. Copy the config values

### Option 2: Firebase CLI

```bash
# Login to Firebase
firebase login

# List projects to find your project ID
firebase projects:list

# Get project config
firebase apps:sdkconfig web
```

## Current Project Details

- **Project ID**: `gearguard-track-app`
- **Console URL**: https://console.firebase.google.com/project/gearguard-track-app

## Setup Steps

1. **Create a Web App** (if not done):
   - Go to Firebase Console > Project Settings
   - Click "Add app" > Web
   - Register app name: "GearGuard Web"

2. **Enable Authentication**:
   - Go to Authentication > Sign-in method
   - Enable "Email/Password" provider

3. **Create Firestore Database**:
   - Go to Firestore Database
   - Click "Create database"
   - Select production mode
   - Choose a location

4. **Copy credentials to `.env.local`**

## Verification

After setting up `.env.local`, restart the dev server:

```bash
npm run dev
```

The app should load without Firebase errors.

