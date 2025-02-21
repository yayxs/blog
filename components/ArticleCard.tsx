import Link from 'next/link'
import type { Post } from '@/lib/mdx'

interface ArticleCardProps {
  post: Post
}

export function ArticleCard({ post }: ArticleCardProps) {
  return (
    <article className="group relative bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800">
      <Link 
        href={`/${post.slug}`}
        className="block p-6"
      >
        {/* 状态和进度指示器 */}
        <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
            post.frontmatter.status === 'draft' 
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-100'
              : post.frontmatter.status === 'updated'
              ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-100'
              : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100'
          }`}>
            {post.frontmatter.status === 'draft' ? '写作中' 
              : post.frontmatter.status === 'updated' ? '已更新' 
              : '已完成'}
          </span>
          <div className="flex items-center gap-2">
            <div className="w-24 h-1 rounded-full bg-gray-200 dark:bg-gray-700">
              <div 
                className="h-1 rounded-full bg-blue-500 dark:bg-blue-400 transition-all duration-300"
                style={{ width: `${post.frontmatter.progress}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {post.frontmatter.progress}%
            </span>
          </div>
        </div>

        {/* 文章主体内容 */}
        <div className="pr-24">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-500 transition-colors duration-300">
            {post.frontmatter.title}
          </h2>
          {post.frontmatter.subtitle && (
            <h3 className="mt-1 text-base text-gray-600 dark:text-gray-400">
              {post.frontmatter.subtitle}
            </h3>
          )}
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {post.frontmatter.summary}
          </p>
        </div>

        {/* 时间信息 */}
        <div className="mt-6 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <time className="flex items-center gap-1">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M3 8H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M3 8C3 6.11438 3 5.17157 3.58579 4.58579C4.17157 4 5.11438 4 7 4H17C18.8856 4 19.8284 4 20.4142 4.58579C21 5.17157 21 6.11438 21 8V17C21 18.8856 21 19.8284 20.4142 20.4142C19.8284 21 18.8856 21 17 21H7C5.11438 21 4.17157 21 3.58579 20.4142C3 19.8284 3 18.8856 3 17V8Z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            开始写于 {post.frontmatter.createdAt}
          </time>
          <span>•</span>
          <time>发布于 {post.frontmatter.publishedAt}</time>
          {post.frontmatter.updatedAt && (
            <>
              <span>•</span>
              <time>更新于 {post.frontmatter.updatedAt}</time>
            </>
          )}
        </div>

        {/* 标签 */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-100 rounded-full">
            {post.frontmatter.category}
          </span>
          {post.frontmatter.tags.map((tag) => (
            <span 
              key={tag}
              className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </article>
  )
} 