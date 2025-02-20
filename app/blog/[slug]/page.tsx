import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

// 预生成静态路由参数
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
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

    return (
      <article className="max-w-3xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            {frontmatter.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <time>开始写于: {frontmatter.createdAt}</time>
            <span>•</span>
            <time>发布于: {frontmatter.publishedAt}</time>
            {frontmatter.updatedAt && (
              <>
                <span>•</span>
                <time>更新于: {frontmatter.updatedAt}</time>
              </>
            )}
          </div>
        </header>
        
        <div className="prose dark:prose-invert max-w-none">
          {content}
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
    <Suspense fallback={<div>加载中...</div>}>
      <BlogPostContent slug={resolvedParams.slug} />
    </Suspense>
  )
} 