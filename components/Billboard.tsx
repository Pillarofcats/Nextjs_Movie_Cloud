// 'use client'

//React
import React from 'react'
//Hooks
import useBillboard from '@/hooks/useBillboard'
//Components
import BillboardMoreInfoBtn from '@/components/BillboardMoreInfoBtn'
import BillboardPlayBtn from '@/components/BillboardPlayBtn'

export default function Billboard() {
  //Hooks
  const { data: billboard } = useBillboard()

  return (
    <div className='relative overflow-hidden'>
      <img 
        className='relative w-screen brightness-[75%] sm:hidden'
        src={billboard?.thumbnailUrl} alt="Thumbnail" />

        <video className='relative w-screen brightness-[75%] hidden sm:block'
          autoPlay
          muted
          loop
          src={ billboard?.videoUrl }>
        </video>

        <div className='absolute w-full bottom-[18%] max-w-[60%] flex flex-col gap-1 items-center sm:items-start left-[50%] -translate-x-[50%] sm:left-[20%] sm:translate-x-[0%] md:left-[5%]'>

          <p className='
            w-full
            hidden
            text-white
            text-3xl
            lg:text-4xl
            xl:text-6xl
            h-full
            font-bold
            drop-shadow-xl'
          >
            { billboard?.title }
          </p>

          <p className='
            md:mt-2
            text-white
            w-full
            hidden
            sm:block
            sm:text-[14px]
            md:text-base
            lg:text-2xl
            xl:text-3xl
            drop-shadow-xl'
          >
            { billboard?.description}
          </p>

          { billboard ?
            (<div className='flex flex-row items-end mt-2 sm:mt-2 md:mt-4 gap-5'>
              <BillboardMoreInfoBtn movieId={ billboard?.id } />
              <BillboardPlayBtn movieId={ billboard?.id } />
            </div>) : null
          }
        </div>
    </div>
  )
}