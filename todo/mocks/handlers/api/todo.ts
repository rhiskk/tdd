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
    return res(
      ctx.status(201),
      ctx.json({
        id: '1',
        title,
        completed: false,
      }),
    )
  }),
  rest.get('/api/todo', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todos))
  }),
]
