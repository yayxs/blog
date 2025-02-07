import { getAllPosts } from '@/lib/mdx'
import Link from 'next/link'

export default async function BlogList() {
  const posts = await getAllPosts()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">博客文章</h1>
      <div className="grid gap-8">
        {posts.map((post) => (
          <article key={post.slug} className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            <Link 
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold group-hover:text-blue-500 transition-colors">
                    {post.frontmatter.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {post.frontmatter.summary}
                  </p>
                </div>
                {post.frontmatter.featured && (
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded">
                    精选
                  </span>
                )}
              </div>
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <time>{post.frontmatter.publishedAt}</time>
                <span>•</span>
                <span>{post.frontmatter.readingTime}</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
} 