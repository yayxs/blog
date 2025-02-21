import type { ReactNode } from 'react'

interface CodeProps {
  children: ReactNode
}

export function Code({ children }: CodeProps) {
  return (
    <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 font-mono text-sm">
      {children}
    </code>
  )
}

export const components = {
  code: Code,
} 