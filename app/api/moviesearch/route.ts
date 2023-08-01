//Nexjs
import { NextRequest, NextResponse } from "next/server";
//PrismaDB
import prismaDB from '@/lib/prismaDB'
//Helper Fn's
import serverAuth from "@/lib/serverAuth"

export async function POST(req:NextRequest, res:NextResponse) {
  //METHOD NOT ALLOWED 405
  if(req.method !== 'POST') NextResponse.json(null, { status:405 })

  try {
    //Authorize user
    await serverAuth(req, res)
    //POST data
    const { query } = await req.json()
    //Check query type
    if( typeof query !== 'string') throw new Error('query is not a string')
    //Query using search autocomplete for movies matching query string
    //Compounding fields (title, genre)
    const searchedMovies = await prismaDB.movie.aggregateRaw({
      pipeline: [{
        $search: {
          index: "Title",
          compound: {
            should: [
              {
                autocomplete: {
                  query: query,
                  path: "title",
                  tokenOrder: "sequential",
                  fuzzy: {
                    prefixLength: 2
                  },
                  score: { 
                    boost: { value: 10 } 
                  }
                }
              },
              {
                autocomplete: {
                  query: query,
                  path: "genre",
                  tokenOrder: "sequential",
                  fuzzy: {
                    prefixLength: 2
                  },
                  score: { 
                    boost: { value: 10 } 
                  }
                }
              }
            ]
          }
        },  
      },
      {
        $project: {
          title: 1,
          id: 1,
          genre: 1,
          score: { $meta: "searchScore" }
        }
      },
      {
        $limit: 10
      }]
    })
    //OK 200
    return NextResponse.json(searchedMovies, { status:200 })
  } 
  catch(error) {
    console.log(error)
    //BAD REQUEST 400
    NextResponse.json(null, { status:400 })
  }
}








