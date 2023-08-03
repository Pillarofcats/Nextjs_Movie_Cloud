//Nextjs
import { NextRequest, NextResponse } from 'next/server'
//Bcrypt
import bcrypt from 'bcrypt'
//PrismaDB
import prismaDB from '@/lib/prismaDB'

export async function POST(req:NextRequest, res:NextResponse) {
  //METHOD NOT ALLOWED 405
  if(req.method !== 'POST') return NextResponse.json(null, { status:405 })

  try {
    //POST data, req.json() contains the body for Nextjs, instead of traditional req.body
    const { email, name, password } = await req.json()
    //Query user by email
    const existingUser = await prismaDB.user.findUnique({
      where: { email }
    })
    //Check user exists
    if(existingUser) {
      //UNPROCESSABLE CONTENT 422
      return NextResponse.json({ error:'Email already exists' })
    }
    //Encrypt user password
    const hashPassword = await bcrypt.hash(password, 12)
    //Create user
    const user = await prismaDB.user.create({
      data: {
        email,
        name,
        hashPassword,
        image: "",
        emailVerified: new Date(),
      }
    })
    //OK 200
    return NextResponse.json(user, { status:200 })
  } 
  catch (error) {
    console.log(error)
    //BAD REQUEST 400
    return NextResponse.json(null, { status:400 })
  }
}