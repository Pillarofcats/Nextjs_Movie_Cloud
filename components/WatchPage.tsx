'use client'

//React
import React, { useState, useEffect, useRef } from "react"
//Nextjs
import { useParams, useRouter, redirect } from "next/navigation"
//Hooks
import useMovie from "@/hooks/useMovie"
import { useThrottle } from "@/hooks/useThrottle"
//NextAuth
import { useSession } from "next-auth/react"
//ReactIcons
import { GoArrowLeft } from 'react-icons/go'
//Components
import Loading from "@/components/Loading"

const WatchPage = () => {
  //Methods
  const videoNavSlideAnimationOnPlay = () => {
    //Close
    setIsMoviePlaying(true)
  }

  const videoNavSlideAnimationOnPause = () => {
    //Open
    setIsMoviePlaying(false)
  }

  //Hooks
  const [isMoviePlaying, setIsMoviePlaying] = useState<boolean>(false)

  const navigationTimerRef = useRef<boolean>()

  const router = useRouter()

  const throttleMouseMove = useThrottle( (e:MouseEvent) => {
    e.preventDefault()
  
    if(navigationTimerRef.current) {
      setIsMoviePlaying(false)
        
      setTimeout(() => {
        if(!navigationTimerRef.current){
          setIsMoviePlaying(true)
        }
      }, 4000)
    }

  }, 750) 
  
  const { movieId } = useParams()

  const { data: movie, isLoading } = useMovie(movieId)

  useEffect(() => {
    addEventListener('mousemove', throttleMouseMove)
    navigationTimerRef.current = isMoviePlaying

    return () => {
      removeEventListener('mousemove', throttleMouseMove)
    }
  }, [isMoviePlaying])

  //NextAuth local session - redirect if no session
  const { data: uSession, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login')
    },
  })
  //Check
  if(isLoading) return (<Loading />)

  return (
    <div className="relative h-screen w-screen bg-black">
      <nav className={`
        ease-in-out
        duration-1000
        fixed
        transform
        items-center
        w-full
        py-2
        z-10
        flex
        flex-row
        gap-4
        bg-black
        ${ isMoviePlaying ? '-translate-y-[100%]' : 'translate-y-[0%]' }
        `}
      >
        <div onClick={ () => { router.push(`/watch/${movieId}/info`) } }
          className="text-white mx-5 cursor-pointer p-1 border-4 rounded-full bg-blue-400 border-white hover:bg-blue-400">
            <GoArrowLeft className="md:text-2xl" />
        </div>
        <p className="text-white text-1xl md:text-3xl font-medium select-none">
          <span className="font-light">
            Watching:
          </span>
          { isLoading ? '' : ` ${ movie?.title }` }
        </p>
      </nav>
      <video
        onPause={ () => videoNavSlideAnimationOnPause( )}
        onPlay={ () => videoNavSlideAnimationOnPlay() }
        controls
        className='h-full w-full' 
        src={ movie?.videoUrl }></video>
    </div>
  )
}

export default React.memo(WatchPage)