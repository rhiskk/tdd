import { type TodoProps, Todo } from './Todo'

export const TodoList = ({ todos }: { todos: TodoProps[] }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}
