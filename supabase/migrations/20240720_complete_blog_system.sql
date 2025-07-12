-- Drop existing tables if they exist to start fresh
DROP TABLE IF EXISTS blog_comments CASCADE;
DROP TABLE IF EXISTS blog_post_tags CASCADE;
DROP TABLE IF EXISTS blog_tags CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS blog_categories CASCADE;

-- Create blog categories table
CREATE TABLE blog_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    color VARCHAR(7) DEFAULT '#10B981',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog tags table
CREATE TABLE blog_tags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog posts table
CREATE TABLE blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image_url TEXT,
    category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
    author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMP WITH TIME ZONE,
    meta_title VARCHAR(60),
    meta_description VARCHAR(160),
    reading_time INTEGER DEFAULT 5,
    views_count INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog post tags junction table
CREATE TABLE blog_post_tags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(post_id, tag_id)
);

-- Create blog comments table
CREATE TABLE blog_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    author_name VARCHAR(100) NOT NULL,
    author_email VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'spam')),
    parent_id UUID REFERENCES blog_comments(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX idx_blog_categories_slug ON blog_categories(slug);
CREATE INDEX idx_blog_tags_slug ON blog_tags(slug);
CREATE INDEX idx_blog_comments_post ON blog_comments(post_id);
CREATE INDEX idx_blog_comments_status ON blog_comments(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_blog_categories_updated_at BEFORE UPDATE ON blog_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_comments_updated_at BEFORE UPDATE ON blog_comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate slug from title
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
END;
$$ LANGUAGE plpgsql;

-- Function to update comments count
CREATE OR REPLACE FUNCTION update_post_comments_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE blog_posts 
        SET comments_count = comments_count + 1 
        WHERE id = NEW.post_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE blog_posts 
        SET comments_count = comments_count - 1 
        WHERE id = OLD.post_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for comments count
CREATE TRIGGER update_comments_count_trigger
    AFTER INSERT OR DELETE ON blog_comments
    FOR EACH ROW EXECUTE FUNCTION update_post_comments_count();

-- Enable RLS
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access
CREATE POLICY "Public can view published blog posts" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view blog categories" ON blog_categories FOR SELECT USING (true);
CREATE POLICY "Public can view blog tags" ON blog_tags FOR SELECT USING (true);
CREATE POLICY "Public can view blog post tags" ON blog_post_tags FOR SELECT USING (true);
CREATE POLICY "Public can view approved comments" ON blog_comments FOR SELECT USING (status = 'approved');

-- RLS Policies for authenticated users (admin)
CREATE POLICY "Authenticated users can manage blog posts" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage categories" ON blog_categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage tags" ON blog_tags FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage post tags" ON blog_post_tags FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage comments" ON blog_comments FOR ALL USING (auth.role() = 'authenticated');

-- Allow public to insert comments (they'll be pending by default)
CREATE POLICY "Public can insert comments" ON blog_comments FOR INSERT WITH CHECK (true);
