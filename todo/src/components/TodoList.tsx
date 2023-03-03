import { Todo } from './Todo'

type TodoProps = {
  id: string
  title: string
  completed: boolean
  archived: boolean
}

export const TodoList = ({ todos }: { todos: TodoProps[] }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}
