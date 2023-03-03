export const Todo = ({ todo, markCompleted }: any) => {
  const handleCheckboxClick = () => {
    markCompleted(todo.id)
  }

  return (
    <li>
      {todo.title}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleCheckboxClick}
      />
    </li>
  )
}
