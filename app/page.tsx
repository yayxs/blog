import { getAllPosts } from '@/lib/mdx'
import { CategoryNav } from '@/components/CategoryNav'
import { ArticleCard } from '@/components/ArticleCard'

export default async function Home() {
  const posts = await getAllPosts()
  
  // 获取所有分类及其文章数量
  const categories = [
    {
      name: 'AI',
      path: '/ai',
      label: 'AI',
      count: posts.filter(post => post.frontmatter.category === 'AI').length
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-8 sm:py-20">
        <CategoryNav categories={categories} />
        
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              最新文章
            </h2>
          </div>

          <div className="grid gap-6">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
