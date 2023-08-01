//Prisma
import { PrismaClient } from '@prisma/client'

//Global files are not affected by Nextjs hot-reloading, so we store it there
//global.prismaDB is typed in 'global.d.ts' file
const client = global.prismaDB || new PrismaClient()
//Store client in global.prismaDB if process.env.NODE_ENV is 'production'
if(process.env.NODE_ENV === 'production') global.prismaDB = client

export default client