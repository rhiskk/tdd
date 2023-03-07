import { Todo } from '../types'

export default function useAddTodo() {
  const addTodo = async (title: string) => {
    const response = await fetch('/api/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    })
    const todo = await response.json()
    return todo as Todo
  }

  return addTodo
}
