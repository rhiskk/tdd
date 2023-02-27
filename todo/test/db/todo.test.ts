import prisma from '@/db'

beforeEach(async () => {
  await prisma.todo.createMany({
    data: [
      {
        title: 'test 1',
        completed: false,
      },
      {
        title: 'test 2',
        completed: false,
      },
    ],
  })
})

afterEach(async () => {
  await prisma.todo.deleteMany()
})

afterAll(async () => {
  await prisma.todo.deleteMany()
  await prisma.$disconnect()
})

it('should get all todos', async () => {
  const todos = await prisma.todo.findMany()
  expect(todos).toHaveLength(2)
})

it('should create a todo "test"', async () => {
  const todo = {
    title: 'test',
  }
  const created = await prisma.todo.create({
    data: todo,
  })
  expect(created.title).toBe(todo.title)
})

it('should create todo with completed false on default', async () => {
  const todo = {
    title: 'test',
  }
  const created = await prisma.todo.create({
    data: todo,
  })
  expect(created.completed).toBe(false)
})

it('should create a todo "test" with completed true', async () => {
  const todo = {
    title: 'test',
    completed: true,
  }
  const created = await prisma.todo.create({
    data: todo,
  })
  expect(created.completed).toBe(todo.completed)
})

it('should update a todo "test 1" to be completed', async () => {
  const todo = await prisma.todo.findFirst({
    where: {
      title: 'test 1',
    },
  })
  if (!todo) {
    throw new Error('todo not found')
  }
  const updated = await prisma.todo.update({
    where: {
      id: todo.id,
    },
    data: {
      completed: true,
    },
  })
  expect(updated.completed).toBe(true)
})

it('should rename a todo "test 1" to "test 1 renamed"', async () => {
  const todo = await prisma.todo.findFirst({
    where: {
      title: 'test 1',
    },
  })
  if (!todo) {
    throw new Error('todo not found')
  }
  const updated = await prisma.todo.update({
    where: {
      id: todo.id,
    },
    data: {
      title: 'test 1 renamed',
    },
  })
  expect(updated.title).toBe('test 1 renamed')
})

it('should archive completed todos', async () => {
  await prisma.todo.createMany({
    data: [
      {
        title: 'test 3',
        completed: true,
      },
      {
        title: 'test 4',
        completed: true,
      },
    ],
  })

  await prisma.todo.updateMany({
    where: {
      completed: true,
    },
    data: {
      archived: true,
    },
  })

  const archived = await prisma.todo.findMany({
    where: {
      archived: true,
    },
  })
  expect(archived).toHaveLength(2)
})

it('should get non archived todos', async () => {
  await prisma.todo.createMany({
    data: [
      {
        title: 'test 3',
        completed: true,
        archived: true,
      },
      {
        title: 'test 4',
        completed: true,
        archived: true,
      },
    ],
  })
  const todos = await prisma.todo.findMany({
    where: {
      archived: false,
    },
  })
  expect(todos).toHaveLength(2)
})
