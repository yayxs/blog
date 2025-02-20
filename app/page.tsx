import { getAllPosts } from '@/lib/mdx'
import Link from 'next/link'

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-4xl mx-auto">
       

        <div className="grid gap-8">
          {posts.map((post) => (
            <article 
              key={post.slug} 
              className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
            >
              <Link href={`/blog/${post.slug}`} className="block group">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold group-hover:text-blue-500 transition-colors">
                      {post.frontmatter.title}
                    </h2>
                    {post.frontmatter.subtitle && (
                      <h3 className="text-base text-gray-600 dark:text-gray-400 mt-1">
                        {post.frontmatter.subtitle}
                      </h3>
                    )}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {post.frontmatter.summary}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-2 py-1 text-xs rounded ${
                      post.frontmatter.status === 'draft' 
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                        : post.frontmatter.status === 'updated'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                    }`}>
                      {post.frontmatter.status === 'draft' ? '写作中' 
                        : post.frontmatter.status === 'updated' ? '已更新' 
                        : '已完成'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      进度: {post.frontmatter.progress}%
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <time>开始写于: {post.frontmatter.createdAt}</time>
                  <span>•</span>
                  <time>发布于: {post.frontmatter.publishedAt}</time>
                  {post.frontmatter.updatedAt && (
                    <>
                      <span>•</span>
                      <time>更新于: {post.frontmatter.updatedAt}</time>
                    </>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 rounded">
                    {post.frontmatter.category}
                  </span>
                  {post.frontmatter.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
