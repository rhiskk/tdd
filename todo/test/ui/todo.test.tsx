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
    const todoElement = screen.getByRole('textbox')
    expect(todoElement).toHaveValue('Todo 1')
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

  it('should mark the todo as completed', async () => {
    const user = userEvent.setup()

    render(<Todo todo={todo} />)
    const checkbox = screen.getByRole('checkbox')

    await user.click(checkbox)

    const checkboxAfterClick = await screen.findByRole('checkbox')
    expect(checkboxAfterClick).toBeChecked()
  })

  it('should rename the todo', async () => {
    const user = userEvent.setup()

    render(<Todo todo={todo} />)
    const todoElement = screen.getByRole('textbox')
    expect(todoElement).toHaveValue('Todo 1')

    const updateButton = screen.getByRole('button')

    await user.type(todoElement, '00')
    await user.click(updateButton)

    const todoElementAfterTyping = await screen.findByRole('textbox')
    expect(todoElementAfterTyping).toHaveValue('Todo 100')
  })
})
