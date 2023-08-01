//Nextjs
import { NextResponse, NextRequest } from 'next/server'
//Helper Fn's
import serverAuth from '@/lib/serverAuth'

export async function GET(req:NextRequest, res:NextResponse) {
  //METHOD NOT ALLOWED 405
  if(req.method !== 'GET') return NextResponse.json(null, { status:405 })
  
  try {
    //Authorize user
    const { currentUser } = await serverAuth(req, res)
    //OK 200
    return NextResponse.json(currentUser, { status:200 })
  } 
  catch(error) {
    console.log(error)
    //BAD REQUEST 400
    return NextResponse.json(null, { status:400 })
  }
}