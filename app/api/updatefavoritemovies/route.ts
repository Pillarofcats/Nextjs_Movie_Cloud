//Nextjs
import { NextRequest, NextResponse } from "next/server"
//Lodash
import { without } from 'lodash'
//PrismaDB
import prismaDB from '@/lib/prismaDB'
//Helper Fn's
import serverAuth from "@/lib/serverAuth"

export async function DELETE(req:NextRequest, res:NextResponse) {
  //METHOD NOT ALLOWED 405
  if(req.method !== 'DELETE') return NextResponse.json(null, { status:405})

  try{
    //Authorize user
    const { currentUser } = await serverAuth(req, res)
    //POST data, req.json() contains the body for Nextjs, instead of traditional req.body
    const { movieId } = await req.json()
    //Query movie exists
    const existingMovie = await prismaDB.movie.findUnique({
      where: {
        id: movieId
      }
    })
    //Check movie exists
    if(!existingMovie) throw new Error('Movie does not exist')
    //Filter movieId from currentUser favoriteIds using { without } from 'lodash'
    //Removing the movieId from user's favorite movies
    const updatedFavoriteIds = without(currentUser.favoriteIds, movieId)
    //Remove favorited movie from currentUser
    const updatedUser = await prismaDB.user.update({
      where: {
        email: currentUser.email || ''
      },
      data: {
        favoriteIds: updatedFavoriteIds
      }
    })
    //OK 200
    return NextResponse.json(updatedUser, { status:200 })

  } 
  catch(error) {
    console.log(error)
    //BAD REQUEST 400
    return NextResponse.json(null, { status:400 })
  }
}

export async function POST(req:NextRequest, res:NextResponse) {
  //METHOD NOT ALLOWED 405 
  if(req.method !== 'POST') return NextResponse.json(null, { status:405 })

  try{
    //Authorize user
    const { currentUser } = await serverAuth(req, res)
    //POST data, req.json() contains the body for Nextjs, instead of traditional req.body
    const { movieId } = await req.json()
    //Query movie exists
    const existingMovie = await prismaDB.movie.findUnique({
      where: {
        id: movieId,
      }
    })
    //Check movie exists
    if(!existingMovie) throw new Error('Movie does not exist')
    //Add favorited movie to currentUser
    const updatedUser = await prismaDB.user.update({
      where: {
        email: currentUser.email || '',
      },
      data: {
        favoriteIds: {
          push: movieId
        }
      }
    })
    //OK 200
    return NextResponse.json(updatedUser, { status:200 })
  } 
  catch(error) {
    console.log(error)
    //BAD REQUEST 400
    return NextResponse.json(null, { status:400 })
  }
}