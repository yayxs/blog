import type { Frontmatter } from '@/lib/mdx'
import { ArticleMeta } from './ArticleMeta'

interface ArticleHeaderProps {
  frontmatter: Frontmatter
}

export function ArticleHeader({ frontmatter }: ArticleHeaderProps) {
  return (
    <header className="py-6 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
            {frontmatter.title}
          </h1>
        </div>
        <div className="flex justify-center">
          <ArticleMeta frontmatter={frontmatter} />
        </div>
      </div>
    </header>
  )
} 