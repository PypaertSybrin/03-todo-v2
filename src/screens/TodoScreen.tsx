import { useEffect, useState } from 'react'
import { Check, Plus, Settings, Trash } from 'lucide-react'
import { Link } from 'react-router-dom'

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
    if (newTodo.task !== '' && newTodo.category !== 'choose') {
      setTodos([...todos, newTodo])
      setNewTodo({
        id: newTodo.id + 1,
        task: '',
        category: 'choose',
        completed: false,
      })
    }
  }

  const removeTodo = (todo: Todo) => () => {
    setTodos(todos.filter(t => t.id !== todo.id))
  }

  const toggleTodo = (id: number) => () => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        }
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  // In het begin maken we een lege todo aan
  // Deze todo wordt dan ingevuld in de form
  const [newTodo, setNewTodo] = useState<Todo>({
    id: todos.length + 1,
    task: '',
    category: 'choose',
    completed: false,
  })

  return (
    <div className="flex flex-col max-w-screen-sm mx-auto min-h-screen">
      <AppHeader todoCount={todos.filter(todo => !todo.completed).length} page="todo" />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <form className="pt-6 pb-6" onSubmit={addTodo}>
            <div className="flex align-middle gap-4 mb-1">
              <button className="p-2 rounded-full bg-blue-400">
                <Plus />
              </button>
              <input
                className="p-2 bg-transparent border-b-2 border-neutral-50 focus:border-b-2 focus:border"
                type="text"
                placeholder="Add a new todo"
                value={newTodo.task}
                onChange={e =>
                  setNewTodo({
                    ...newTodo,
                    task: e.target.value,
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
          <div>
            <Link to="/settings">
              <button>
                <Settings />
              </button>
            </Link>
          </div>
        </div>
        {todos.map(todo => {
          return (
            <div
              key={todo.id}
              className={`flex justify-between items-center p-4 bg-white dark:bg-neutral-700 rounded-lg mb-4 shadow-md ${todo.completed ? 'opacity-50' : ''}`}
            >
              <div>
                <div className="flex gap-3">
                  <input
                    type="checkbox"
                    id={todo.id.toString()}
                    className="sr-only peer"
                    onChange={toggleTodo(todo.id)}
                    checked={todo.completed}
                  />
                  <label
                    htmlFor={todo.id.toString()}
                    className="p-2 rounded-full border peer-checked:bg-blue-400 peer-checked:text-blue-100 peer-focus-visible:bg-blue-400 hover:bg-blue-100 hover:text-blue-500"
                  >
                    <Check className="stroke-current size-4" />
                  </label>
                  {/* de htmlFor is eigenlijk gewoon de for waarmee je dus de input koppelt aan de label (id van input en htmlFor moeten blijkbaar een string zijn) */}
                  <h3 className="text-xl font-bold">{todo.task}</h3>
                </div>
                <p className="text-neutral-500 ml-11">{todo.category}</p>
              </div>
              <div>
                <button onClick={removeTodo(todo)}>
                  <Trash className="hover:text-red-500" />
                </button>
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
