# Portfolio Analytics Setup Guide

This guide explains how to set up and configure the custom analytics system for your portfolio website.

## Overview

The analytics system tracks:

- Total time spent on your site
- Time spent on each section
- Scroll depth
- Bounce rate
- User sessions

Data is stored in Appwrite Collections and visualized in a private admin dashboard.

## Appwrite Setup

1. Create an Appwrite account at [https://appwrite.io/](https://appwrite.io/)
2. Create a new project
3. Create a new database for analytics
4. Create two collections:

### Sessions Collection

Create a collection with the following attributes:

- `sessionId` (string, required)
- `startedAt` (datetime, required)
- `endedAt` (datetime, optional)
- `totalTime` (integer, optional) - in seconds
- `scrollDepth` (integer, required) - percentage 0-100
- `isBounce` (boolean, required)

### Section Views Collection

Create a collection with the following attributes:

- `sessionId` (string, required)
- `sectionId` (string, required)
- `enterTime` (datetime, required)
- `exitTime` (datetime, optional)
- `timeSpent` (integer, optional) - in seconds

## Permissions

For both collections:

1. Enable read access for authenticated users (or specific roles/users if needed)
2. Enable write access for any user (the client will need to create records)

## Environment Variables

Copy the `.env.local.example` file to `.env.local` and update the variables:

```
# Appwrite configuration
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_ANALYTICS_DATABASE_ID=your_database_id
NEXT_PUBLIC_APPWRITE_SESSIONS_COLLECTION_ID=your_sessions_collection_id
NEXT_PUBLIC_APPWRITE_SECTION_VIEWS_COLLECTION_ID=your_section_views_collection_id

# Admin dashboard access token
NEXT_PUBLIC_ANALYTICS_SECRET_TOKEN=your_secret_token
```

Create a secure token for the admin dashboard and add it to the `.env.local` file.

## Implementation

The analytics system consists of:

1. **Services**:

   - `appwrite.ts` - Appwrite client configuration
   - `analytics.ts` - Analytics service for tracking

2. **Hooks**:

   - `useTrackSection.ts` - Track section visibility
   - `useScrollTracker.ts` - Track scroll depth

3. **Components**:

   - `AnalyticsProvider.tsx` - Provider component to initialize tracking

4. **Admin Dashboard**:
   - `/admin/insights` - Protected dashboard to view analytics

## Using the Section Tracking

To track a section, import the `useTrackSection` hook and use it in your component:

```tsx
import { useTrackSection } from '@/app/hooks/useTrackSection';
import { SectionId } from '@/app/services/appwrite';

export default function YourSection() {
	const sectionRef = useTrackSection({ sectionId: SectionId.YOUR_SECTION });

	return <section ref={sectionRef}>{/* Section content */}</section>;
}
```

## Accessing the Dashboard

Visit `/admin/insights` and enter your secret token to access the analytics dashboard.

## Extending the System

To track additional metrics:

1. Add new fields to the Appwrite collections
2. Update the interfaces in `appwrite.ts`
3. Add tracking logic in `analytics.ts`
4. Update the dashboard in `/admin/insights/page.tsx`

## Troubleshooting

- Ensure all environment variables are correctly set
- Check browser console for any errors
- Verify Appwrite project and collection permissions
- Confirm network requests are being sent to Appwrite
