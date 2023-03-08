import { rest } from 'msw'

type Todo = {
  id: string
  title: string
  completed: boolean
  archived: boolean
}

const todos: Todo[] = [
  {
    id: '1',
    title: 'Todo 1',
    completed: false,
    archived: false,
  },
  {
    id: '2',
    title: 'Todo 2',
    completed: true,
    archived: false,
  },
]

export const todoHandlers = [
  rest.post('/api/todo', async (req, res, ctx) => {
    const { title } = await req.json()
    const todo = {
      id: '3',
      title,
      completed: false,
      archived: false,
    }
    todos.push(todo)
    return res(ctx.status(201), ctx.json(todo))
  }),
  rest.get('/api/todo', async (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todos))
  }),
  rest.put('/api/todo/:id', async (req, res, ctx) => {
    const { id } = req.params
    const { completed } = await req.json()
    const todo = todos.find((todo) => todo.id === id)
    todo!.completed = completed
    return res(ctx.status(200), ctx.json(todo))
  }),
  rest.patch('/api/todo', async (_req, res, ctx) => {
    const archivedTodos = todos.filter((todo) => todo.completed)
    archivedTodos.forEach((todo) => (todo.archived = true))
    return res(ctx.status(200), ctx.json(archivedTodos))
  }),
]
