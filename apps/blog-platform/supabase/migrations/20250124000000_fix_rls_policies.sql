-- Fix RLS policies to work without Supabase Auth for local auth demo
-- This migration modifies policies to allow operations without authentication
-- since the app uses local authentication stored in sessionStorage

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access to users" ON blog_users;
DROP POLICY IF EXISTS "Allow users to update their own profile" ON blog_users;
DROP POLICY IF EXISTS "Allow public read access to published posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow authenticated users to create posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow authors to update their own posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow authors to delete their own posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow public read access to comments" ON blog_comments;
DROP POLICY IF EXISTS "Allow authenticated users to create comments" ON blog_comments;
DROP POLICY IF EXISTS "Allow users to update their own comments" ON blog_comments;
DROP POLICY IF EXISTS "Allow users to delete their own comments" ON blog_comments;

-- Create new simplified policies that allow all operations
-- This is suitable for a demo application with local authentication

-- Blog Users policies - allow all operations
CREATE POLICY "Allow all operations on users" ON blog_users
  FOR ALL USING (true) WITH CHECK (true);

-- Blog Posts policies - allow all operations
CREATE POLICY "Allow all operations on posts" ON blog_posts
  FOR ALL USING (true) WITH CHECK (true);

-- Blog Comments policies - allow all operations  
CREATE POLICY "Allow all operations on comments" ON blog_comments
  FOR ALL USING (true) WITH CHECK (true);