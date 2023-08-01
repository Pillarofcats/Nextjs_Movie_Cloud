//Nextjs
import { NextRequest, NextResponse } from "next/server"
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
    //Query latest movies by release for latestpage component
    const moviesSortByRelease = await prismaDB.movie.findMany({
      orderBy: {
        release: 'desc'
      }
    })
    //OK 200
    return NextResponse.json(moviesSortByRelease, { status:200 })
  } 
  catch(error) {
    console.log(error)
    //BAD REQUEST 400
    return NextResponse.json(null, { status:400 })
  }
}