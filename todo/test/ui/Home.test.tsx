import { render, screen } from '@testing-library/react'
import Home from '@/pages/index'
import userEvent from '@testing-library/user-event'

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

  it('should render a todo form', () => {
    render(<Home />)
    const todoForm = screen.getByRole('form')
    expect(todoForm).toBeInTheDocument()
  })

  it('should render an archive button', async () => {
    render(<Home />)
    const archiveButton = await screen.findByRole('button', {
      name: 'Archive Completed Todos',
    })
    expect(archiveButton).toBeInTheDocument()
  })

  it('should show only non archived todos after archiving', async () => {
    const user = userEvent.setup()
    render(<Home />)
    const archiveButton = await screen.findByText('Archive Completed Todos')
    await user.click(archiveButton)
    const todoList = await screen.findAllByRole('listitem')
    expect(todoList).toHaveLength(2)
  })
})
