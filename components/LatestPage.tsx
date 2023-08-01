'use client'

//NextAuth
import { useSession } from "next-auth/react"
//Nextjs
import { redirect } from 'next/navigation'
//Hooks
import useMoviesLatest from "@/hooks/useMoviesLatest"
//Components
import MovieList from "@/components/MovieList"
import Navbar from "@/components/Navbar"

export default function LatestPage() {
  //Hooks
  const { data: movies = [], isLoading } = useMoviesLatest()

  //NextAuth local session - redirect if no session
  const { data: uSession, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login')
    },
  })

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] text-white">
      <Navbar />
      <div className="flex flex-1">
        <MovieList movies={ movies } title="Latest Movies" isLoading={ isLoading } />
      </div>
    </div>
  )
}