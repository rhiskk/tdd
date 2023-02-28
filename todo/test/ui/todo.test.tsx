import { screen, render } from '@testing-library/react'
import { type TodoProps, Todo } from '@/components/todo'

describe('Todo', () => {
  it('should render a todo with the correct title', () => {
    const todo: TodoProps = {
      id: '1',
      title: 'Todo 1',
      completed: false,
      archived: false,
    }
    render(<Todo todo={todo} />)
    const todoElement = screen.getByRole('listitem')
    expect(todoElement).toHaveTextContent('Todo 1')
  })
})
