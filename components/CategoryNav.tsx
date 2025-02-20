import Link from 'next/link'

interface Category {
  name: string
  path: string
  label: string
  count: number
}

interface CategoryNavProps {
  categories: Category[]
  activeCategory?: string
}

export function CategoryNav({ categories, activeCategory }: CategoryNavProps) {
  return (
    <nav className="mb-12">
      <ul className="flex gap-4 items-center">
        <li>
          <Link
            href="/"
            className={`px-4 py-2 rounded-full transition-colors ${
              !activeCategory
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            全部
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category.name}>
            <Link
              href={category.path}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeCategory === category.name
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {category.label} ({category.count})
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
} 