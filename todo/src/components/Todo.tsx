import type { Todo as TodoProps } from '@/types'
import useUpdateTodo from '@/hooks/useUpdateTodo'
import { useState } from 'react'

export const Todo = ({ todo }: { todo: TodoProps }) => {
  const [completed, setCompleted] = useState(todo.completed)
  const [title, setTitle] = useState(todo.title)
  const updateTodo = useUpdateTodo()

  const handleCheckboxClick = async () => {
    const updated = await updateTodo(todo.id, { completed: !todo.completed })
    setCompleted(updated.completed)
  }

  const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleUpdate = async () => {
    await updateTodo(todo.id, { title })
  }

  return (
    <li>
      <input type="text" value={title} onChange={handleTitleChange} />
      <button onClick={handleUpdate}>Update</button>
      <input
        type="checkbox"
        checked={completed}
        onChange={handleCheckboxClick}
      />
    </li>
  )
}
