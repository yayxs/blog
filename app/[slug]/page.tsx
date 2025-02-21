import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { BlogContent } from './BlogContent'
import { ArticleHeader } from './components/ArticleHeader'
import Link from 'next/link'

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
      <article className="min-h-screen bg-white dark:bg-gray-900">
        <ArticleHeader frontmatter={frontmatter} />
        <main className="py-8">
          <div className="max-w-3xl mx-auto px-4 relative">
            <Link
              href="/"
              className="hidden lg:flex fixed top-32 -right-16 items-center justify-center w-8 h-8 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-300 group"
              aria-label="返回首页"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                />
              </svg>
              <span className="fixed left-full ml-2 px-2 py-1 text-sm bg-gray-800 text-white rounded opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                返回首页
              </span>
            </Link>
            <BlogContent content={content} />
          </div>
        </main>
      </article>
    )
  } catch {
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