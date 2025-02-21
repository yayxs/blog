import createMDX from '@next/mdx'
import type { Configuration } from 'webpack'
import type { NextConfig } from 'next'

const withMDX = createMDX({
  // 添加 MDX 选项
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  
  // 开发环境配置
  webpack: (config: Configuration, { dev }: { dev: boolean; isServer: boolean }) => {
    if (dev) {
      // 配置 MDX 文件的处理
      config.watchOptions = {
        ...config.watchOptions,
        ignored: /node_modules/,
        aggregateTimeout: 200,
        poll: 1000,
      }

      // 添加 MDX 文件处理
      config.module?.rules?.push({
        test: /\.mdx?$/,
        use: [
          {
            loader: '@mdx-js/loader',
            options: {
              development: true
            }
          }
        ]
      })

      // 处理 punycode 警告
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve?.fallback,
          punycode: false
        }
      }
    }
    
    return config
  },

  // 禁用页面优化以支持热更新
  reactStrictMode: true,
  experimental: {
    mdxRs: false, // 禁用 Rust 版本的 MDX 编译器
    turbo: {
      resolveAlias: {
        // 确保 MDX 文件被正确处理
        '@mdx-js/react': '@mdx-js/react'
      }
    }
  }
}

export default withMDX(nextConfig)
