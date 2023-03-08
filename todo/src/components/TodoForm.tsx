import { useState } from 'react'
import useAddTodo from '@/hooks/useAddTodo'

export const TodoForm = () => {
  const [title, setTitle] = useState('')
  const addTodo = useAddTodo()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTodo(title)
    setTitle('')
  }

  return (
    <form name="todo-form" onSubmit={handleSubmit}>
      <input id="title" type="text" value={title} onChange={onChange} />
      <button type="submit">Add Todo</button>
    </form>
  )
}
