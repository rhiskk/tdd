import { render, screen } from '@testing-library/react'
import Home from '@/pages/index'

describe('Homepage', () => {
  it('should render the home page', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', { name: 'Todos:' })
    expect(heading).toBeInTheDocument()
  })

  it('should render a list of todos', async () => {
    render(<Home />)
    const todoList = await screen.findAllByRole('listitem')
    expect(todoList).toHaveLength(2)
  })

  it('should render a list of todos with the correct text', async () => {
    render(<Home />)
    const todoList = await screen.findAllByRole('listitem')
    expect(todoList[0]).toHaveTextContent('Todo 1')
    expect(todoList[1]).toHaveTextContent('Todo 2')
  })
})
