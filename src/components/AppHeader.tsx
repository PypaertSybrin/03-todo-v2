export const AppHeader = ({ todoCount }: { todoCount?: number }) => {
  return (
    <header className="border border-spacing-2 rounded-lg mt-4">
      <div className="p-6">
        <h1 className="text-4xl mb-2 font-bold">Hello, Sybrin</h1>
        <p className="text-neutral-500">
          There {todoCount === 1 ? 'is' : 'are'} {todoCount} {todoCount === 1 ? 'todo' : 'todo\'s'} left todo
        </p>
      </div>
    </header>
  )
}
