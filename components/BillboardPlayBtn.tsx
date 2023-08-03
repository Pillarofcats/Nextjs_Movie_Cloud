// 'use client'

//React
import React from "react"
//NextIcons
import { GoPlay } from 'react-icons/go'
//Nextjs
import Link from "next/link"
//interface
import iPlayMovie from "@/interface/playmovie"

export default function BillboardPlayBtn({ movieId }:iPlayMovie) {

  return (
    <Link
      href={`/watch/${movieId}`}
      className='
        cursor-pointer
        bg-blue-400
        text-white
        bg-opacity-80
        rounded-md
        py-1
        sm:py-1
        md:py-2
        px-2
        md:px-4
        w-auto
        text-large
        md:text-1xl
        lg:text-2xl
        font-semibold
        flex
        flex-row
        items-center
        transition
        hover:scale-105
        hover:bg-opacity-100'
      >
      <GoPlay className='mr-2' />
      Play
    </Link>
  )
}