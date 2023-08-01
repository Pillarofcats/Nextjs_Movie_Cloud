//Nextjs
import { NextResponse, NextRequest } from "next/server"
//PrismaDB
import prismaDB from '@/lib/prismaDB'
//Helper Fn's
import serverAuth from "@/lib/serverAuth"

export async function GET(req:NextRequest, res:NextResponse) {
  //METHOD NOT ALLOWED 405
  if(req.method !== 'GET') return NextResponse.json(null, { status:405 })

  try {
    //Authorize user
    await serverAuth(req, res)
    //Request page url pathname
    const routePathname = req.nextUrl.pathname
    //Capture movieId from url pathname using regex
    const [ movieId ]:any = routePathname.match(/[^\/][a-z0-9]*$/g)
    //Check movieId type
    if (typeof movieId !== 'string') throw new Error('Invalid movieId')
    //Check movieId exist
    if(!movieId) throw new Error('Invalid movieId')
    //Query movieId for watchpage component
    const movie = await prismaDB.movie.findUnique({
      where: {
        id: movieId
      }
    })
    //Check movie exist
    if(!movie) throw new Error('Invalid movieId')
    //OK 200
    return NextResponse.json(movie, { status:200 })
  } 
  catch(error) {
    console.log(error)
    //BAD REQUEST 400
    return NextResponse.json(null, { status:400 })
  }
}