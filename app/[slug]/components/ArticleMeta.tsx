import type { Frontmatter } from '@/lib/mdx'

interface ArticleMetaProps {
  frontmatter: Frontmatter
}

export function ArticleMeta({ frontmatter }: ArticleMetaProps) {
  return (
    <div className="mt-2 text-gray-500 dark:text-gray-400 space-y-2 text-center">
      {/* 时间和状态 */}
      <div className="flex items-center justify-center text-sm">
        <time>{frontmatter.publishedAt}</time>
        <span className="mx-2">·</span>
        <span>{frontmatter.status === 'draft' ? '写作中' 
          : frontmatter.status === 'updated' ? '已更新' 
          : '已完成'}</span>
        <span className="mx-2">·</span>
        <span>{Math.round(frontmatter.progress)}% 完成</span>
      </div>

      {/* 分类和标签 */}
      <div className="flex flex-wrap gap-2 justify-center text-sm">
        <span className="text-purple-600 dark:text-purple-400">
          {frontmatter.category}
        </span>
        {frontmatter.tags?.map((tag) => (
          <span 
            key={tag}
            className="text-gray-600 dark:text-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
} 