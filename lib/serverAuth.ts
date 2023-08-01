//Types
import { NextApiRequest, NextApiResponse } from 'next'
//Nextjs
import { NextRequest, NextResponse } from 'next/server'

//NextAuth
import { getServerSession } from 'next-auth/next'
//Lib - nextauth options
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
//PrismaDB client
import prismaDB from '@/lib/prismaDB'

//Middleware
const serverAuth = async (req:NextRequest, res:NextResponse) => {

  //Get other schema fields for Session
  const session = await getServerSession(
    req as unknown as NextApiRequest,
    {
      ...res,
      getHeader: (name: string) => res.headers?.get(name),
      setHeader: (name: string, value: string) => res.headers?.set(name, value),
    } as unknown as NextApiResponse,
    authOptions
  )
  //Check
  if(!session?.user?.email) {
    throw new Error('Not signed in')
  }

  const currentUser = await prismaDB.user.findUnique({
    where: {
      email: session.user.email,
    }
  })
  //Check
  if(!currentUser) {
    throw new Error('Not signed in')
  }
  
  return { currentUser }
}

export default serverAuth