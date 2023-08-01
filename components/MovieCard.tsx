//React
import React from 'react'
//Interface
import iMovieCard from '@/interface/moviecard'
//Components
import FavoriteMovieBtn from '@/components/FavoriteMovieBtn'
import PlayMovieBtn from '@/components/PlayMovieBtn'
import MoreInfoBtn from '@/components/MoreInfoBtn'


export default function MovieCard({ movie }:iMovieCard) {

  return (
    <div className='group relative overflow-hidden'>
      
      <img className={`
        ${movie?.title === 'Tears of Steel' ? '-my-[3.4%]' : ''}
        object-cover
        transition
        shadow-xl
        rounded-sm
        group-hover:scale-105
      `}
        src={ movie?.thumbnailUrl } alt="Thumbnail"
      />

      <div className='sm:opacity-0 bg-gray-800 bg-opacity-90 absolute left-0 bottom-0 right-0 h-20 group-hover:opacity-100 group-hover:bg-gray-800 group-hover:bg-opacity-90'>
        <div className='flex flex-row gap-5 justify-center absolute left-[50%] -translate-x-[50%] transform h-full w-full text-blue-400 brightness-125 text-1xl'>
          
          <MoreInfoBtn movieId={ movie?.id } />
          <FavoriteMovieBtn movieId={ movie?.id } />

          <div className='flex flex-col justify-center'>
            <p>Genre: <span className='text-white'>{ movie?.genre }</span></p>
            <p>Duration: <span className='text-white'>{ movie?.duration }</span></p>
          </div>
        </div>
      </div>
      <PlayMovieBtn movieId={ movie?.id }/>
    </div>
  )
}