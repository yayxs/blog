import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import './prose.css'

// 预生成静态路由参数
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

interface BlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

async function BlogPostContent({ slug }: { slug: string }) {
  try {
    const { frontmatter, content } = await getPostBySlug(slug)

    return (
      <article className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        {/* 文章头部信息 */}
        <header className="relative py-16 sm:py-20">
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
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-gray-900 dark:text-white leading-tight">
                {frontmatter.title}
              </h1>
              {frontmatter.subtitle && (
                <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                  {frontmatter.subtitle}
                </p>
              )}
            </div>

            {/* 状态和进度 */}
            <div className="flex flex-col gap-2 mb-8">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
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
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1 rounded-full bg-gray-200 dark:bg-gray-700">
                    <div 
                      className="h-1 rounded-full bg-blue-500 dark:bg-blue-400 transition-all duration-300"
                      style={{ width: `${frontmatter.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {frontmatter.progress}%
                  </span>
                </div>
              </div>
            </div>

            {/* 时间信息 */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
              <time className="flex items-center gap-1">
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

            {/* 分类和标签 */}
            <div className="flex flex-wrap gap-2 mt-6">
              <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-100 rounded-full">
                {frontmatter.category}
              </span>
              {frontmatter.tags?.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* 文章内容 */}
        <main className="relative pb-16">
          <div className="relative max-w-[65ch] mx-auto px-4 sm:px-6">
            <div className="prose prose-lg dark:prose-invert prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800/50 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700">
              {content}
            </div>
          </div>
        </main>
      </article>
    );
  } catch  {
    notFound();
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