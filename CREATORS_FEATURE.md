# Creators Feature Documentation

## Overview

The Creators feature provides a dedicated page for browsing and discovering content creators on the platform. This feature includes a complete creator listing interface with search, filtering, and follow functionality.

## Files Created/Modified

### 1. `src/components/CreatorCard.tsx`
A new React component that displays individual creator profiles in a card format.

**Features:**
- Profile picture with verification badge
- Creator username and social handles
- Bio with text truncation
- Statistics (followers, NFTs, views)
- Follow/Unfollow button
- Social media links
- Join date display

**Props:**
- `creator`: Creator object containing profile data
- `onFollow`: Optional callback for follow/unfollow actions
- `isFollowing`: Boolean indicating follow status

### 2. `src/pages/Creators.tsx` (Updated)
Modified the existing Creators page to properly display creators instead of NFTs.

**Features:**
- Search creators by name, bio, or handle
- Sort by newest/oldest
- Filter by all creators or followed creators
- Tabbed interface (Featured/New creators)
- Responsive grid layout
- Loading states with skeleton UI
- Empty state handling

## Creator Data Structure

```typescript
interface Creator {
  id: number;
  username: string;
  email: string;
  profilePicture?: string;
  bio?: string;
  twitterHandle?: string;
  instagramHandle?: string;
  websiteUrl?: string;
  isCreator: boolean;
  isVerified?: boolean;
  followerCount?: number;
  followingCount?: number;
  nftCount?: number;
  totalViews?: number;
  createdAt: string;
  updatedAt: string;
}
```

## API Integration

The creators page fetches data from:
- **Endpoint**: `${BASE_URL}/api/users/list?isCreator=true`
- **Method**: GET
- **Response**: `{ data: Creator[] }`

## UI Components Used

- **shadcn/ui components**: Card, Button, Input, Select, Badge, Skeleton
- **Icons**: Lucide React (Users, Heart, Eye, RefreshCw)
- **Utilities**: date-fns for date formatting

## Styling

- Uses Tailwind CSS for styling
- Dark theme with gray color scheme
- Responsive design (mobile-first)
- Hover effects and transitions
- Grid layout: 1 column (mobile) → 4 columns (desktop)

## TODO Items

1. **Authentication Integration**
   - Implement actual follow/unfollow functionality
   - Add user authentication checks
   - Show followed creators based on user data

2. **Enhanced Features**
   - Creator profile pages
   - Creator statistics
   - Featured creators algorithm
   - Creator verification system

3. **Performance Optimizations**
   - Pagination for large creator lists
   - Virtual scrolling
   - Image lazy loading
   - Caching strategies

## Usage

Navigate to `/creators` to access the creators page. Users can:

1. Browse all creators in a grid layout
2. Search for specific creators
3. Sort by join date (newest/oldest)
4. Filter between all creators and followed creators
5. Follow/unfollow creators (when implemented)
6. View creator social links and statistics

## Dependencies

- React Query for data fetching
- date-fns for date formatting
- Tailwind CSS for styling
- Lucide React for icons
- shadcn/ui component library

## Testing

To test the creators feature:

1. Start the development server
2. Navigate to `/creators`
3. Verify creator cards display properly
4. Test search functionality
5. Test sorting and filtering
6. Verify responsive design on different screen sizes

The feature is ready for production use with the noted TODO items for future enhancements.