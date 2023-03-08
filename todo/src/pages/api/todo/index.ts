import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/db'
import { z } from 'zod'

const todoSchema = z.object({
  title: z.string(),
  completed: z.boolean().optional(),
  archived: z.boolean().optional(),
})

export default async function todosHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const todos = await prisma.todo.findMany({
      where: {
        archived: false,
      },
    })
    res.status(200).json(todos)
  }

  if (req.method === 'POST') {
    try {
      todoSchema.parse(req.body)
      const todo = await prisma.todo.create({
        data: req.body,
      })

      res.status(201).json(todo)
    } catch (error) {
      res.status(400).json({ error })
    }
  }

  if (req.method === 'PATCH') {
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

    res.status(200).json(archived)
  }
}
