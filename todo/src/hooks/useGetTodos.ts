import { useEffect, useState } from 'react'
import { Todo } from '../types'

export default function useGetTodos() {
  const [todos, setTodos] = useState<Todo[]>([])

  const fetchTodos = async () => {
    const response = await fetch('/api/todo')
    const todos = await response.json()
    setTodos(todos)
  }
  useEffect(() => {
    fetchTodos()
  })

  return todos
}
