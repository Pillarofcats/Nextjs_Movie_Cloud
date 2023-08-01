// 'use client'

//Nextjs
import Link from 'next/link'
//ReactIcons
import { GoInfo } from 'react-icons/go'
//Interface
import iMovieInfo from '@/interface/movieinfo'

export default function BillboardMoreInfoBtn({ movieId }:iMovieInfo) {

  return (
    <Link href={`/watch/${movieId}/info`}
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
        text-md
        lg:text-lg
        font-semibold
        flex
        flex-row
        items-center
        transition
        hover:scale-105
        hover:bg-opacity-100'
    > 
      <GoInfo className='mr-2' />
      Info
    </Link>
  )
}