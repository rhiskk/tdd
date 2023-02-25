import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const hello = await prisma.hello.findMany()
    res.status(200).json(hello)
  }

  if (req.method === 'POST') {
    const hello = await prisma.hello.create({
      data: req.body,
    })

    res.status(201).json(hello)
  }
}
