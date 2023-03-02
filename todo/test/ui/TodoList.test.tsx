import { screen, render } from '@testing-library/react'
import { TodoList } from '@/components/TodoList'

const todos = [
  {
    id: '1',
    title: 'Todo 1',
    completed: false,
    archived: false,
  },
  {
    id: '2',
    title: 'Todo 2',
    completed: false,
    archived: false,
  },
]

describe('TodoList', () => {
  it('should render a list of todos', () => {
    render(<TodoList todos={todos} />)
    const todoList = screen.getAllByRole('listitem')
    expect(todoList).toHaveLength(2)
    expect(todoList[0]).toHaveTextContent('Todo 1')
  })
})
