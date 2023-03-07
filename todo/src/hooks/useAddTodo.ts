import { useState } from 'react'
import { Todo } from '../types'

export default function useAddTodo() {
  const [newTodo, setNewTodo] = useState<Todo>()

  const addTodo = async (title: string) => {
    const response = await fetch('/api/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    })
    const todo = await response.json()
    setNewTodo(todo)
  }

  return { newTodo, addTodo }
}
