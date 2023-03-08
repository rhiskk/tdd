import { renderHook, act } from '@testing-library/react'
import useUpdateTodo from './useUpdateTodo'

describe('useUpdateTodo', () => {
  it('should send a put request with the id and return a updated todo', async () => {
    const { result } = renderHook(useUpdateTodo)

    let updatedTodo = null

    await act(async () => {
      updatedTodo = await result.current('1', { completed: true })
    })

    expect(updatedTodo).toEqual({
      id: '1',
      title: 'Todo 1',
      completed: true,
      archived: false,
    })
  })

  it('should rename a todo', async () => {
    const { result } = renderHook(useUpdateTodo)

    let updatedTodo = null

    await act(async () => {
      updatedTodo = await result.current('1', { title: 'Todo 1 Updated' })
    })

    expect(updatedTodo).toEqual({
      id: '1',
      title: 'Todo 1 Updated',
      completed: true,
      archived: false,
    })
  })
})
