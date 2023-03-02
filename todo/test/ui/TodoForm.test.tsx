import { render, screen } from '@testing-library/react'
import { TodoForm } from '@/components/TodoForm'

describe('TodoForm', () => {
  it('should render an input field for title', () => {
    render(<TodoForm />)
    const titleInput = screen.getByRole('textbox', { id: /title/i })
    expect(titleInput).toBeInTheDocument()
  })
})
