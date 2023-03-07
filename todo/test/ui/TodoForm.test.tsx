import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoForm } from '@/components/TodoForm'
import useAddTodo from '@/hooks/useAddTodo'

jest.mock('@/hooks/useAddTodo')

describe('TodoForm', () => {
  it('should render an input field for title', () => {
    render(<TodoForm />)
    const titleInput = screen.getByRole('textbox')
    expect(titleInput).toBeInTheDocument()
  })

  it('should render a submit button', () => {
    render(<TodoForm />)
    const submitButton = screen.getByRole('button')
    expect(submitButton).toBeInTheDocument()
  })

  it('should call addTodo with input when the submit button is clicked', async () => {
    const user = userEvent.setup()
    const mockAddTodo = jest.fn()
    ;(useAddTodo as any).mockReturnValue(mockAddTodo)

    render(<TodoForm />)

    const submitButton = screen.getByRole('button')
    const input = screen.getByRole('textbox')

    await user.type(input, 'Todo 1')
    await user.click(submitButton)

    expect(mockAddTodo).toHaveBeenCalledWith('Todo 1')
  })
})
