import { getAllPosts } from '@/lib/mdx'
import Link from 'next/link'

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-8 sm:py-20">
        
        <div className="grid gap-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${post.slug}`}
              className="block p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300">
                {post.frontmatter.title}
              </h3>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
