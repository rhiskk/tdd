import { useState } from 'react'

export const TodoForm = ({ addTodo }: any) => {
  const [title, setTitle] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTodo(title)
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input id="title" type="text" value={title} onChange={onChange} />
      <button type="submit">Add Todo</button>
    </form>
  )
}
