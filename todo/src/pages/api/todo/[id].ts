import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/db'
import { z } from 'zod'

const updateSchema = z.object({
  title: z.string().optional(),
  completed: z.boolean().optional(),
  archived: z.boolean().optional(),
})

export default async function todoHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query

  if (typeof id !== 'string') {
    res.status(400).json({ error: 'id must be a string' })
    return
  }

  if (req.method === 'GET') {
    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    })
    if (!todo) {
      res.status(404).json({ error: 'todo not found' })
      return
    }
    res.status(200).json(todo)
  }

  if (req.method === 'PUT') {
    try {
      updateSchema.parse(req.body)
      const todo = await prisma.todo.update({
        where: {
          id: id,
        },
        data: req.body,
      })

      if (!todo) {
        res.status(404).json({ error: 'todo not found' })
        return
      }

      res.status(200).json(todo)
    } catch (error) {
      res.status(400).json({ error })
      return
    }
  }
}
