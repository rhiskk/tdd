import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query

  if (typeof id !== 'string') {
    res.status(400).json({ error: 'id must be a string' })
    return
  }

  if (req.method === 'GET') {
    const hello = await prisma.hello.findUnique({
      where: {
        id: id,
      },
    })
    res.status(200).json(hello)
  }

  if (req.method === 'PUT') {
    const hello = await prisma.hello.update({
      where: {
        id: id,
      },
      data: req.body,
    })

    res.status(200).json(hello)
  }

  if (req.method === 'DELETE') {
    const hello = await prisma.hello.delete({
      where: {
        id: id,
      },
    })

    res.status(200).json(hello)
  }
}
