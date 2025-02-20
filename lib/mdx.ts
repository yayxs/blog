import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import { components as mdxComponents } from '@/components/mdx-components'

const postsDirectory = path.join(process.cwd(), 'content/posts')

// 缓存文件内容
const fileContentCache = new Map<string, string>()

// 添加文件监听
function watchFile(filePath: string) {
  if (process.env.NODE_ENV === 'development') {
    const watcher = fs.watch(filePath, (eventType) => {
      if (eventType === 'change') {
        // 清除文件内容缓存
        fileContentCache.delete(filePath)
      }
    })
    return () => watcher.close()
  }
  return () => {}
}

// 读取文件内容（带缓存）
function readFileContent(filePath: string): string {
  if (!fileContentCache.has(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8')
    fileContentCache.set(filePath, content)
    return content
  }
  return fileContentCache.get(filePath)!
}

export async function getAllPosts() {
  const files = fs.readdirSync(postsDirectory)
  
  const posts = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename)
      const fileContent = readFileContent(filePath)
      
      const { frontmatter, content } = await compileMDX({
        source: fileContent,
        options: { 
          parseFrontmatter: true,
          mdxOptions: {
            development: process.env.NODE_ENV === 'development'
          }
        },
        components: mdxComponents
      })

      // 开发环境下监听文件变化
      if (process.env.NODE_ENV === 'development') {
        watchFile(filePath)
      }

      return {
        slug: filename.replace(/\.mdx$/, ''),
        frontmatter: frontmatter as Frontmatter,
        content
      }
    })
  )

  return posts.sort((a, b) => 
    new Date(b.frontmatter.publishedAt).getTime() - 
    new Date(a.frontmatter.publishedAt).getTime()
  )
}

export async function getPostBySlug(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}.mdx`)
  
  // 开发环境下监听文件变化
  if (process.env.NODE_ENV === 'development') {
    watchFile(filePath)
  }
  
  const fileContent = readFileContent(filePath)
  
  const { frontmatter, content } = await compileMDX({
    source: fileContent,
    options: { 
      parseFrontmatter: true,
      mdxOptions: {
        development: process.env.NODE_ENV === 'development'
      }
    },
    components: mdxComponents
  })

  return {
    frontmatter: frontmatter as Frontmatter,
    content
  }
}

export type Frontmatter = {
  // 基础信息
  title: string           // 主标题
  subtitle?: string       // 子标题
  summary: string         // 概要摘要
  
  // 时间相关
  createdAt: string      // 开始写作时间
  publishedAt: string    // 发布时间
  updatedAt?: string     // 更新时间
  
  // 状态相关
  status: 'draft' | 'completed' | 'updated'  // 写作中|已完成|已更新
  progress: number        // 写作进度百分比 0-100
  
  // 分类相关
  tags: string[]         // 标签列表
  category: string       // 主分类
}

export type Post = {
  slug: string
  frontmatter: Frontmatter
  content: string
} 