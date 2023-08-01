//Nextjs
import { NextRequest, NextResponse } from "next/server"
//PrismaDB
import prismaDB from '@/lib/prismaDB'
//Helper Fn's
import serverAuth from "@/lib/serverAuth"

export async function GET(req:NextRequest, res:NextResponse) {
  //METHOD NOT ALLOWD 405
  if(req.method !== 'GET') return NextResponse.json(null, { status:405 })

  try {
    //Authorize user
    await serverAuth(req, res)
    //Query all movies for movielist component
    const movies = await prismaDB.movie.findMany()
    //OK 200
    return NextResponse.json(movies, { status:200 })
  } 
  catch(error) {
    console.log(error)
    //BAD REQUEST 400
    return NextResponse.json(null, { status:400 })
  }
}