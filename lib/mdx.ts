import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import { cache } from 'react'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export type Frontmatter = {
  // 基础信息
  title: string           // 主标题
  subtitle?: string       // 子标题
  summary: string         // 概要摘要
  
  // 时间相关
  publishedAt: string     // 发布时间
  updatedAt?: string      // 更新时间
  
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

export const getAllPosts = cache(async () => {
  const files = fs.readdirSync(postsDirectory)
  
  const posts = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      
      const { frontmatter, content } = await compileMDX({
        source: fileContent,
        options: { parseFrontmatter: true }
      })

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
})

export async function getPostBySlug(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}.mdx`)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  
  const { frontmatter, content } = await compileMDX({
    source: fileContent,
    options: { parseFrontmatter: true }
  })

  return {
    frontmatter: frontmatter as Frontmatter,
    content
  }
} 