import { getAllPosts } from '@/lib/mdx'
import { CategoryNav } from '@/components/CategoryNav'
import { ArticleCard } from '@/components/ArticleCard'

export default async function AIArticles() {
  const allPosts = await getAllPosts()
  
  // 获取所有分类及其文章数量
  const categories = [
    {
      name: 'AI',
      path: '/ai',
      label: 'AI',
      count: allPosts.filter(post => post.frontmatter.category === 'AI').length
    }
  ]
  
  const posts = allPosts.filter(post => post.frontmatter.category === 'AI')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-8 sm:py-20">
        <CategoryNav categories={categories} activeCategory="AI" />
        
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          AI 相关文章
        </h1>

        <div className="grid gap-6">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </div>
  )
} 