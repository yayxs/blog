interface StatusAndProgressProps {
  status: string
  progress: number
}

export function StatusAndProgress({ status, progress }: StatusAndProgressProps) {
  return (
    <div className="flex items-center gap-2">
      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
        status === 'draft' 
          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-100'
          : status === 'updated'
          ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-100'
          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100'
      }`}>
        {status === 'draft' ? '写作中' 
          : status === 'updated' ? '已更新' 
          : '已完成'}
      </span>
      <div className="flex items-center gap-2">
        <div className="w-24 h-1 rounded-full bg-gray-200 dark:bg-gray-700">
          <div 
            className="h-1 rounded-full bg-blue-500 dark:bg-blue-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          {progress}%
        </span>
      </div>
    </div>
  )
} 