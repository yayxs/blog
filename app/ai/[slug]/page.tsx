import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import './prose.css'

// 预生成静态路由参数
export async function generateStaticParams() {
  const posts = await getAllPosts()
  // 只返回 AI 类别的文章
  return posts
    .filter(post => post.frontmatter.category === 'AI')
    .map((post) => ({
      slug: post.slug,
    }))
}

interface BlogPostProps {
  params: Promise<{
    slug: string
  }>
}

async function BlogPostContent({ slug }: { slug: string }) {
  try {
    const { frontmatter, content } = await getPostBySlug(slug)

    // 如果不是 AI 类别的文章，返回 404
    if (frontmatter.category !== 'AI') {
      notFound()
    }

    return (
      <article className="min-h-screen bg-white dark:bg-gray-900">
        {/* 文章头部信息 */}
        <header className="relative py-16 sm:py-20 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-950/50 dark:to-gray-900">
          <div className="max-w-[65ch] mx-auto px-4 sm:px-6">
            {/* 返回首页按钮 */}
            <div className="mb-16">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-300 group"
              >
                <svg 
                  className="w-4 h-4 transition-transform duration-300 transform group-hover:-translate-x-1" 
                  viewBox="0 0 24 24" 
                  fill="none"
                >
                  <path 
                    d="M19 12H5M5 12L12 19M5 12L12 5" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                返回首页
              </Link>
            </div>

            {/* 文章标题和副标题 */}
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-gray-900 dark:text-white leading-tight">
                {frontmatter.title}
              </h1>
              {frontmatter.subtitle && (
                <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  {frontmatter.subtitle}
                </p>
              )}
            </div>

            {/* 文章元信息 */}
            <div className="mt-12 flex flex-col items-center gap-8">
              {/* 状态和进度 */}
              <div className="flex items-center gap-4">
                <span className={`px-4 py-2 rounded-full font-medium ${
                  frontmatter.status === 'draft' 
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-100'
                    : frontmatter.status === 'updated'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-100'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100'
                }`}>
                  {frontmatter.status === 'draft' ? '写作中' 
                    : frontmatter.status === 'updated' ? '已更新' 
                    : '已完成'}
                </span>
                {frontmatter.status === 'draft' && (
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                      <div 
                        className="h-2 rounded-full bg-yellow-500 dark:bg-yellow-400 transition-all duration-300"
                        style={{ width: `${frontmatter.progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {frontmatter.progress}%
                    </span>
                  </div>
                )}
              </div>

              {/* 时间信息 */}
              <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm text-gray-500 dark:text-gray-400">
                <time className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M3 8H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M3 8C3 6.11438 3 5.17157 3.58579 4.58579C4.17157 4 5.11438 4 7 4H17C18.8856 4 19.8284 4 20.4142 4.58579C21 5.17157 21 6.11438 21 8V17C21 18.8856 21 19.8284 20.4142 20.4142C19.8284 21 18.8856 21 17 21H7C5.11438 21 4.17157 21 3.58579 20.4142C3 19.8284 3 18.8856 3 17V8Z" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  开始写于 {frontmatter.createdAt}
                </time>
                <span>•</span>
                <time>发布于 {frontmatter.publishedAt}</time>
                {frontmatter.updatedAt && (
                  <>
                    <span>•</span>
                    <time>更新于 {frontmatter.updatedAt}</time>
                  </>
                )}
              </div>

              {/* 标签列表 */}
              <div className="flex flex-wrap justify-center gap-3">
                {frontmatter.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* 文章内容 */}
        <main className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 opacity-50" />
          <div className="relative max-w-[65ch] mx-auto px-4 sm:px-6 py-16">
            <div className="prose dark:prose-invert">
              {content}
            </div>
          </div>
        </main>

        {/* 移动端返回按钮 */}
        <div className="sm:hidden fixed bottom-6 right-6 z-10">
          <Link
            href="/"
            className="flex items-center justify-center w-10 h-10 bg-gray-800/80 backdrop-blur-sm dark:bg-gray-700/80 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-700 dark:hover:bg-gray-600"
          >
            <svg 
              className="w-5 h-5" 
              viewBox="0 0 24 24" 
              fill="none"
            >
              <path 
                d="M19 12H5M5 12L12 19M5 12L12 5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </article>
    )
  } catch (error) {
    console.error('Error loading blog post:', error)
    notFound()
  }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const resolvedParams = await params
  
  if (!resolvedParams?.slug) {
    notFound()
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    }>
      <BlogPostContent slug={resolvedParams.slug} />
    </Suspense>
  )
} 