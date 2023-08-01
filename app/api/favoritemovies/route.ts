//Nextjs
import { NextRequest, NextResponse } from "next/server"
//PrismaDB
import prismaDB from '@/lib/prismaDB'
//Helper Fn's
import serverAuth from "@/lib/serverAuth"

export async function GET(req:NextRequest, res:NextResponse) {
  //METHOD NOT ALLOWED 405
  if(req.method !== 'GET') return NextResponse.json(null, { status:405 })

  try{
    //Authorize user
    const { currentUser } = await serverAuth(req, res)
    //Query current user's favorite movies for favoritespage component
    const favoriteMovies = await prismaDB.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        }
      }
    })
    //OK 200
    return NextResponse.json(favoriteMovies, { status:200 })
  } 
  catch(error) {
    console.log(error)
    //BAD REQUEST 400
    return NextResponse.json(null, { status:400 })
  }
}