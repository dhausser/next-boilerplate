import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, User } from '@prisma/client'

type Data = {
  user: User
}

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const users = await prisma.user.findMany()
  const user = users[0]
  res.status(200).json({ user })
}
