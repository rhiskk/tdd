import { renderHook, act } from '@testing-library/react'
import useAddTodo from './useAddTodo'

describe('useAddTodo', () => {
  it('should send a post request with the title and return a created todo', async () => {
    const { result } = renderHook(useAddTodo)

    await act(async () => {
      await result.current.addTodo('Todo test')
    })

    expect(result.current.newTodo).toEqual({
      id: '3',
      title: 'Todo test',
      completed: false,
      archived: false,
    })
  })
})
