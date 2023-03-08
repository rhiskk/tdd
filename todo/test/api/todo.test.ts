import { createMocks } from 'node-mocks-http'
import todosHandler from '@/pages/api/todo'
import todoHandler from '@/pages/api/todo/[id]'
import prisma from '@/db'

describe('/api/todo', () => {
  it('POST should create a todo when passed a valid title', async () => {
    const todo = {
      title: 'Todo test',
    }

    prisma.todo.create = jest.fn().mockResolvedValue(todo)

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        title: 'Todo test',
      },
    })

    await todosHandler(req, res)

    expect(res._getStatusCode()).toBe(201)
    expect(res._getJSONData()).toEqual(todo)
  })

  it('POST should error when passed an invalid title', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        title: 1,
      },
    })

    await todosHandler(req, res)
    expect(res._getStatusCode()).toBe(400)
  })

  it('GET should get all todos', async () => {
    const todos = [
      {
        id: '1',
        title: 'Todo test 1',
        completed: false,
      },
      {
        id: '2',
        title: 'Todo test 2',
        completed: false,
      },
    ]

    prisma.todo.findMany = jest.fn().mockResolvedValue(todos)

    const { req, res } = createMocks({
      method: 'GET',
    })

    await todosHandler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData()).toEqual(todos)
  })

  it('PATCH should archive completed todos', async () => {
    const todos = [
      {
        id: '1',
        title: 'Todo test 1',
        completed: true,
        archived: false,
      },
      {
        id: '2',
        title: 'Todo test 2',
        completed: false,
        archived: false,
      },
    ]

    const archivedTodos = [
      {
        id: '1',
        title: 'Todo test 1',
        completed: true,
        archived: true,
      },
    ]

    prisma.todo.updateMany = jest.fn().mockResolvedValue(1)
    prisma.todo.findMany = jest.fn().mockResolvedValue(archivedTodos)

    const { req, res } = createMocks({
      method: 'PATCH',
    })

    await todosHandler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData()).toEqual(archivedTodos)
  })
})

describe('/api/todo/[id]', () => {
  it('GET should get a todo by id', async () => {
    const todo = {
      id: '1',
      title: 'Todo test 1',
      completed: false,
      archived: false,
    }

    prisma.todo.findUnique = jest.fn().mockResolvedValue(todo)

    const { req, res } = createMocks({
      method: 'GET',
      query: {
        id: '1',
      },
    })

    await todoHandler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData()).toEqual(todo)
  })

  it('GET should error when passed an invalid id', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        id: 1,
      },
    })

    await todoHandler(req, res)

    expect(res._getStatusCode()).toBe(400)
  })

  it('GET should error when passed an id that does not exist', async () => {
    prisma.todo.findUnique = jest.fn().mockResolvedValue(null)

    const { req, res } = createMocks({
      method: 'GET',
      query: {
        id: '1',
      },
    })

    await todoHandler(req, res)

    expect(res._getStatusCode()).toBe(404)
  })

  it('PUT should update a todo when passed a valid update', async () => {
    const todo = {
      title: 'Todo test 1',
      completed: true,
    }

    prisma.todo.update = jest.fn().mockResolvedValue(todo)

    const { req, res } = createMocks({
      method: 'PUT',
      query: {
        id: '1',
      },
      body: {
        completed: true,
      },
    })

    await todoHandler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData().completed).toBe(true)
  })

  it('PUT should error when passed an invalid update', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
      query: {
        id: '1',
      },
      body: {
        completed: 1,
      },
    })

    await todoHandler(req, res)

    expect(res._getStatusCode()).toBe(400)
  })

  it('PUT should error when trying to update a todo that does not exist', async () => {
    prisma.todo.update = jest.fn().mockResolvedValue(null)

    const { req, res } = createMocks({
      method: 'PUT',
      query: {
        id: '1',
      },
      body: {
        completed: true,
      },
    })

    await todoHandler(req, res)

    expect(res._getStatusCode()).toBe(404)
  })
})
