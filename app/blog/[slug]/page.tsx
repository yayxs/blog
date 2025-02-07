import { getPostBySlug } from '@/lib/mdx'
import { notFound } from 'next/navigation'

export default async function BlogPost({
  params: { slug }
}: {
  params: { slug: string }
}) {
  try {
    const { frontmatter, content } = await getPostBySlug(slug)

    return (
      <article className="max-w-3xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            {frontmatter.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <img
                src={frontmatter.author.avatar}
                alt={frontmatter.author.name}
                className="w-6 h-6 rounded-full"
              />
              <span>{frontmatter.author.name}</span>
            </div>
            <time>{frontmatter.publishedAt}</time>
            <span>{frontmatter.readingTime}</span>
          </div>
        </header>
        
        <div className="prose dark:prose-invert max-w-none">
          {content}
        </div>
      </article>
    )
  } catch (error) {
    notFound()
  }
} 