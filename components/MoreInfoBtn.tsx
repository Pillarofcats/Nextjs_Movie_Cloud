// 'use client'

//Nextjs
import Link from 'next/link'
//ReactIcons
import { GoInfo } from 'react-icons/go'
//Interface
import iMovieInfo from '@/interface/movieinfo'

export default function MoreInfoBtn({ movieId }:iMovieInfo) {

  return (
    <Link href={`/watch/${movieId}/info`}
      className='text-white self-center text-3xl hover:cursor-pointer'> 
        <GoInfo className='hover:text-blue-400'/>
    </Link>
  )
}