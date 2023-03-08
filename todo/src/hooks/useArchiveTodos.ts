import type { Todo } from '../types'

export default function useArchiveTodos() {
  const archiveTodos = async () => {
    const response = await fetch('/api/todo', {
      method: 'PATCH',
    })
    const todos = await response.json()
    return todos as Todo[]
  }

  return archiveTodos
}
