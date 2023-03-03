import { screen, render } from '@testing-library/react'
import { Todo } from '@/components/Todo'
import userEvent from '@testing-library/user-event'

const todo = {
  id: '1',
  title: 'Todo 1',
  completed: false,
  archived: false,
}

const todoCompleted = {
  id: '2',
  title: 'Todo 2',
  completed: true,
  archived: false,
}

describe('Todo', () => {
  it('should render a todo with the correct title', () => {
    render(<Todo todo={todo} />)
    const todoElement = screen.getByRole('listitem')
    expect(todoElement).toHaveTextContent('Todo 1')
  })

  it('should render a checkbox', () => {
    render(<Todo todo={todo} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
  })

  it('checkbox should be checked when todo is completed', () => {
    render(<Todo todo={todoCompleted} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('checkbox should not be checked when todo is not completed', () => {
    render(<Todo todo={todo} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  it('should call onUpdate when checkbox is clicked', async () => {
    const user = userEvent.setup()
    const mockMarkCompleted = jest.fn()

    render(<Todo todo={todo} markCompleted={mockMarkCompleted} />)
    const checkbox = screen.getByRole('checkbox')

    await user.click(checkbox)

    expect(mockMarkCompleted).toHaveBeenCalled()
  })
})
