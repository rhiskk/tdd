import { renderHook, act } from '@testing-library/react'
import useArchiveTodos from './useArchiveTodos'

describe('useArchiveTodos', () => {
  it('should send a patch request and return archived todos', async () => {
    const { result } = renderHook(useArchiveTodos)

    let archivedTodos = null

    await act(async () => {
      archivedTodos = await result.current()
    })

    expect(archivedTodos).toEqual([
      {
        id: '2',
        title: 'Todo 2',
        completed: true,
        archived: true,
      },
    ])
  })
})
