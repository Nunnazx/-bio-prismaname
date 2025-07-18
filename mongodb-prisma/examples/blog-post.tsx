import { getBlogPost } from "../actions/blog"
import { formatDistanceToNow } from "date-fns"

export default async function BlogPost({ slug }: { slug: string }) {
  const post = await getBlogPost(slug)
  
  if (!post) {
    return (
      <div className="max-w-3xl mx-auto py-12">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
          <p className="font-bold">Post not found</p>
          <p>The blog post you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }
  
  const authorName = [post.author.firstName, post.author.lastName]
    .filter(Boolean)
    .join(" ") || "Anonymous"
    
  const publishedDate = post.publishedAt 
    ? formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })
    : "Draft"
  
  return (
    <article className="max-w-3xl mx-auto py-12">
      {/* Featured Image */}
      {post.featuredImage && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <img 
            src={post.featuredImage} 
            alt={post.title} 
            className="w-full h-auto object-cover"
          />
        </div>
      )}
      
      {/* Post Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          {post.category && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
              {post.category}
            </span>
          )}
          <span>{publishedDate}</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        
        {post.excerpt && (
          <p className="text-xl text-gray-600 mb-4">{post.excerpt}</p>
        )}
        
        <div className="flex items-center gap-3">
          {post.author.avatarUrl ? (
            <img 
              src={post.author.avatarUrl} 
              alt={authorName}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              {authorName.charAt(0)}
            </div>
          )}
          <div>
            <p className="font-medium">{authorName}</p>
            <p className="text-sm text-gray-600">{post.author.email}</p>
          </div>
        </div>
      </header>
      
      {/* Post Content */}
      <div className="prose prose-lg max-w-none">
        {/* This would ideally use a rich text renderer */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
      
      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-8 pt-6 border-t">
          <h2 className="text-sm font-medium text-gray-500 mb-3">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span 
                key={tag} 
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}