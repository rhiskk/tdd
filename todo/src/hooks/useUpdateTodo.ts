import type { Todo } from '../types'

export default function useUpdateTodo() {
  const updateTodo = async (id: string, data: Partial<Todo>) => {
    const response = await fetch(`/api/todo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const todo = await response.json()
    return todo as Todo
  }

  return updateTodo
}
