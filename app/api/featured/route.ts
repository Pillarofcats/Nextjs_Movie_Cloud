//Nextjs
import { NextRequest, NextResponse } from 'next/server'
//PrismaDB
import prismaDB from '@/lib/prismaDB'
//Helper Fn's
import serverAuth from '@/lib/serverAuth'

export async function GET(req:NextRequest, res:NextResponse) {
  //METHOD NOT ALLOWED 405
  if(req.method !== 'GET') return NextResponse.json(null, { status:405})

  try {
    //Authorize user
    await serverAuth(req, res)
    //Query featured movie for billboard component
    const movie = await prismaDB.movie.findUnique({
      where: {
        id:'64ba142898abef133ef4c104',
      }
    })
    //OK 200
    return NextResponse.json(movie, { status:200 })
  } 
  catch(error) {
    console.log(error)
    //BAD REQUEST 400
    return NextResponse.json(null, { status:400 })
  }
}