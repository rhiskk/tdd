import { createMocks } from 'node-mocks-http'
//import handler from '@/pages/api/todo'
import prisma from '@/db'

xdescribe('/api/todo', () => {
  it('should create a todo', async () => {
    const todo = {
      id: '1',
      title: 'Todo test',
      completed: false,
    }

    prisma.todo.create = jest.fn().mockResolvedValue(todo)

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        title: 'Todo test',
      },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(201)
    expect(res._getJSONData()).toEqual(todo)
  })
})
