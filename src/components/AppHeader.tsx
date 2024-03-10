import { ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export const AppHeader = ({
  todoCount,
  page,
}: {
  todoCount?: number
  page: string
}) => {
  const todoMessage = () => {
    if (page === 'settings') return null
    return (
      <p className="text-neutral-500">
        There {todoCount === 1 ? 'is' : 'are'} {todoCount}{' '}
        {todoCount === 1 ? 'todo' : "todo's"} left todo
      </p>
    )
  }

  const goBack = () => {
    if (page === 'todo') return null
    return (
      <Link to="/" className="text-blue-400">
        <ChevronLeft />
      </Link>
    )
  }

  return (
    <header className="border border-spacing-2 rounded-lg mt-4">
      <div className={`p-6 ${page==='settings' ? 'flex items-center gap-4': ''}`}>
        {goBack()}
        <h1 className="text-4xl mb-2 font-bold">
          {page === 'todo' ? 'Hello, Sybrin' : 'Settings'}
        </h1>
        {todoMessage()}
      </div>
    </header>
  )
}
