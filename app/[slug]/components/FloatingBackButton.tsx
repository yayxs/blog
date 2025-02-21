'use client'

import Link from 'next/link'

export function FloatingBackButton() {
  return (
    <Link
      href="/"
      className={`
        fixed z-50 bottom-8 right-8 
        flex items-center justify-center
        w-10 h-10 
        bg-white dark:bg-gray-800 
        text-gray-600 dark:text-gray-300
        rounded-full shadow-lg 
        hover:bg-gray-50 dark:hover:bg-gray-700
        transition-colors duration-300
      `}
      aria-label="返回首页"
    >
      <svg 
        className="w-5 h-5" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
        />
      </svg>
    </Link>
  )
} 