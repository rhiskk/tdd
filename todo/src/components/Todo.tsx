export type TodoProps = {
  id: string
  title: string
  completed: boolean
  archived: boolean
}

export const Todo = ({ todo }: { todo: TodoProps }) => {
  return (
    <li>
      <span>{todo.title}</span>
    </li>
  )
}
