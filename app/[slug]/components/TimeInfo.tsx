interface TimeInfoProps {
  createdAt: string
  publishedAt: string
  updatedAt?: string
}

export function TimeInfo({ createdAt, publishedAt, updatedAt }: TimeInfoProps) {
  return (
    <div className="flex items-center gap-4">
      <time className="flex items-center gap-1">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
          <path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M3 8H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M3 8C3 6.11438 3 5.17157 3.58579 4.58579C4.17157 4 5.11438 4 7 4H17C18.8856 4 19.8284 4 20.4142 4.58579C21 5.17157 21 6.11438 21 8V17C21 18.8856 21 19.8284 20.4142 20.4142C19.8284 21 18.8856 21 17 21H7C5.11438 21 4.17157 21 3.58579 20.4142C3 19.8284 3 18.8856 3 17V8Z" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
        开始写于 {createdAt}
      </time>
      <span>•</span>
      <time>发布于 {publishedAt}</time>
      {updatedAt && (
        <>
          <span>•</span>
          <time>更新于 {updatedAt}</time>
        </>
      )}
    </div>
  )
} 