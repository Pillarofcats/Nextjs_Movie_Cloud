//React
import React from "react"
//NextIcons
import { GoPlay } from 'react-icons/go'
//Nextjs
import Link from "next/link"
//Interfaces
import iPlayMovie from "@/interface/playmovie"

export default function PlayMovieBtn({ movieId }:iPlayMovie) {

  return (
    <Link
      href={`/watch/${movieId}`}
      className='
        sm:opacity-0
        bg-blue-400
        rounded-full
        p-1
        absolute
        top-[50%]
        left-[50%]
        transform
        -translate-x-[50%]
        -translate-y-[50%]
        opacity-80
        group-hover:opacity-80
        hover:group-hover:opacity-100
        hover:group-hover:cursor-pointer
    '>
      <GoPlay size={ 60 }/>
    </Link>
  )
}

{/* <div
      onClick={ () => router.push(`/watch/${movieId}`) }
      className='
        sm:opacity-0
        bg-blue-400
        rounded-full
        p-1
        absolute
        top-[50%]
        left-[50%]
        transform
        -translate-x-[50%]
        -translate-y-[50%]
        opacity-80
        group-hover:opacity-80
        hover:group-hover:opacity-100
        hover:group-hover:cursor-pointer
    '>
      <GoPlay size={ 60 }/>
    </div> */}