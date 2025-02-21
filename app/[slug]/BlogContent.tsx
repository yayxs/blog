'use client'

import { ReactNode } from 'react'

interface BlogContentProps {
  content: ReactNode
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="space-y-6 text-base leading-7 text-gray-700 dark:text-gray-300">
      <style jsx global>{`
        h1 { @apply text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4; }
        h2 { @apply text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4; }
        h3 { @apply text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3; }
        p { @apply mb-4; }
        a { @apply text-blue-600 dark:text-blue-400 hover:underline; }
        ul { @apply list-disc list-inside mb-4; }
        ol { @apply list-decimal list-inside mb-4; }
        li { @apply mb-2; }
        code { @apply px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-sm; }
        pre { @apply p-4 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-x-auto mb-4; }
        pre code { @apply bg-transparent p-0; }
        blockquote { @apply pl-4 border-l-4 border-gray-200 dark:border-gray-700 italic; }
        img { @apply rounded-lg max-w-full h-auto; }
        hr { @apply my-8 border-gray-200 dark:border-gray-700; }
      `}</style>
      {content}
    </div>
  )
} 