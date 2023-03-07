import type { Todo as TodoProps } from '@/types'
import useUpdateTodo from '@/hooks/useUpdateTodo'
import { useState } from 'react'

export const Todo = ({ todo }: { todo: TodoProps }) => {
  const [completed, setCompleted] = useState(todo.completed)
  const updateTodo = useUpdateTodo()

  const handleCheckboxClick = async () => {
    const updated = await updateTodo(todo.id, { completed: !todo.completed })
    setCompleted(updated.completed)
  }

  return (
    <li>
      {todo.title}
      <input
        type="checkbox"
        checked={completed}
        onChange={handleCheckboxClick}
      />
    </li>
  )
}
