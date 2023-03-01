import { screen, render } from '@testing-library/react'
import { Todo } from '@/components/Todo'

describe('Todo', () => {
  it('should render a todo with the correct title', () => {
    const todo = {
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
