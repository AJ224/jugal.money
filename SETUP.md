# jugal.money - Setup Guide

Your money talks platform is now ready! Here's everything you need to know to get started.

## What's Been Built

✅ **Public Homepage** - Clean, professional blog listing page at `/`
✅ **Blog Detail Pages** - Individual article pages at `/blog/[slug]`
✅ **Admin Login** - Secure admin authentication at `/admin/login`
✅ **Admin Dashboard** - Blog management interface at `/admin/dashboard`
✅ **Database Integration** - Supabase PostgreSQL with Row Level Security
✅ **API Routes** - REST endpoints for blog operations

## Getting Started

### 1. Create an Admin User in Supabase

You need to create an admin user account in your Supabase project:

1. Go to your Supabase dashboard
2. Navigate to Authentication > Users
3. Click "Create user" and enter:
   - Email: `admin@jugal.money` (or your preferred email)
   - Password: Choose a strong password
   - Email confirmed: Toggle ON

### 2. First Time Login

1. Visit `/admin/login`
2. Enter the email and password you created
3. You'll be redirected to the admin dashboard at `/admin/dashboard`

### 3. Create Your First Blog Post

1. Click "New Post" button
2. Fill in:
   - **Title**: Your article title
   - **Slug**: Auto-generated from title (used in URL)
   - **Author**: Jugal Lodha (or customize)
   - **Excerpt**: Brief summary
   - **Content**: Full article text
   - **Status**: Draft or Published
3. Click "Save Post"

### 4. View on Public Site

Once published, your post will appear on the homepage at `/` and be accessible at `/blog/[slug]`.

## Features

### Public Side
- Clean, professional homepage with all published posts
- Individual blog post pages with full content
- Responsive design that works on all devices
- Professional typography and spacing

### Admin Side
- Secure login with Supabase authentication
- Create, edit, and delete blog posts
- Draft and published status options
- View all posts in a table with quick actions
- Automatic slug generation from titles

## Database Schema

The `blogs` table includes:
- `id`: Unique identifier (UUID)
- `title`: Post title
- `slug`: URL-friendly identifier
- `excerpt`: Brief summary
- `content`: Full article content
- `author`: Author name
- `status`: 'draft' or 'published'
- `featured_image`: Optional image URL
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

## Security

- Admin routes are protected with middleware
- Only published posts are visible to the public
- Supabase Row Level Security (RLS) policies ensure:
  - Public users can only see published posts
  - Admins can manage all posts
- Passwords are securely hashed by Supabase

## File Structure

```
app/
├── page.tsx                    # Homepage
├── blog/[slug]/page.tsx       # Blog detail page
├── admin/
│   ├── login/page.tsx         # Admin login
│   └── dashboard/
│       ├── page.tsx           # Dashboard with blog list
│       ├── BlogForm.tsx       # Shared form component
│       ├── new/page.tsx       # Create new post
│       └── [slug]/page.tsx    # Edit post
├── api/
│   ├── auth/login/route.ts    # Login API
│   └── blogs/
│       ├── route.ts           # Get all & create blogs
│       └── [slug]/route.ts    # Get, update, delete blogs
```

## Next Steps

1. Test the login at `/admin/login`
2. Create a sample blog post
3. View it on the homepage
4. Customize the platform as needed

## Customization Ideas

- Add more fields to blog posts (categories, tags, featured images)
- Implement a rich text editor instead of plain text
- Add a comment system
- Create tag/category filtering
- Add newsletter subscription
- Implement search functionality

## Support

If you need help or encounter issues:
1. Check the Supabase error logs in your dashboard
2. Review the API routes in `app/api/`
3. Check browser console for client-side errors
