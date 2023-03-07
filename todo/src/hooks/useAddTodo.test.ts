import { renderHook, act } from '@testing-library/react'
import useAddTodo from './useAddTodo'

describe('useAddTodo', () => {
  it('should send a post request with the title and return a created todo', async () => {
    const { result } = renderHook(useAddTodo)

    let newTodo = null

    await act(async () => {
      newTodo = await result.current('Todo test')
    })

    expect(newTodo).toEqual({
      id: '3',
      title: 'Todo test',
      completed: false,
      archived: false,
    })
  })
})
