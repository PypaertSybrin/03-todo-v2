import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'

import { AppHeader } from '../components/AppHeader'
import { AppFooter } from '../components/AppFooter'
import { Todo } from '../models/Todo'

export const TodoScreen = () => {
  // dit is onze lijst van todos
  const [todos, setTodos] = useState<Todo[]>(
    localStorage.todos ? JSON.parse(localStorage.todos) : [],
  )
  // wanneer de lijst van todos veranderd, sla het op in localstorage
  useEffect(() => {
    localStorage.todos = JSON.stringify(todos)
  }, [todos])

  // De ingevulde todo wordt toegevoegd aan de lijst van todos
  // En de nieuwe todo wordt gereset
  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.title !== '' && newTodo.category !== 'choose') {
      setTodos([...todos, newTodo])
      setNewTodo({
        id: newTodo.id + 1,
        title: '',
        category: 'choose',
        completed: false,
      })
    }
  }

  // In het begin maken we een lege todo aan
  // Deze todo wordt dan ingevuld in de form
  const [newTodo, setNewTodo] = useState<Todo>({
    id: todos.length + 1,
    title: '',
    category: 'choose',
    completed: false,
  })

  return (
    <div className="flex flex-col max-w-screen-sm mx-auto min-h-screen">
      <AppHeader todoCount = {todos.length} />
      <div className="flex-1">
        <form className="pt-6" onSubmit={addTodo}>
          <div className="flex align-middle gap-4 mb-1">
            <button className="p-2 rounded-full bg-blue-400">
              <Plus />
            </button>
            <input
              className="p-2 bg-transparent border-b-2 border-neutral-50 focus:border-b-2 focus:border"
              type="text"
              placeholder="Add a new todo"
              value={newTodo.title}
              onChange={e =>
                setNewTodo({
                  ...newTodo,
                  title: e.target.value,
                })
              }
            />
          </div>
          <select
            name="category"
            id="category"
            className="bg-transparent ml-14"
            value={newTodo.category}
            onChange={(event: React.FormEvent<HTMLSelectElement>) => {
              setNewTodo({
                ...newTodo,
                category: event.currentTarget.value,
              })
            }}
          >
            <option className="bg-neutral-800" value="choose" disabled>
              Choose
            </option>
            <option className="bg-neutral-800" value="work">
              Work
            </option>
            <option className="bg-neutral-800" value="personal">
              Personal
            </option>
            <option className="bg-neutral-800" value="hobby">
              Hobby
            </option>
          </select>
        </form>
        {todos.map(todo => {
          return (
            <div
              key={todo.id}
              className="flex justify-between items-center border-b-2 border-neutral-50 py-4"
            >
              <div>
                <h3 className="text-xl font-bold">{todo.title}</h3>
                <p className="text-neutral-500">{todo.category}</p>
              </div>
            </div>
          )
        })}
      </div>
      <div className="justify-self-end align-bottom">
        <AppFooter />
      </div>
    </div>
  )
}
