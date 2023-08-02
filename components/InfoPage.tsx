'use client'

//React
import React from "react"
//Components
import Navbar from "@/components/Navbar"
import MovieInfo from "@/components/MovieInfo"
//Nextjs
import { useSession } from "next-auth/react"
import { redirect } from 'next/navigation'
import { useParams } from "next/navigation"
//Hoks
import useMovie from "@/hooks/useMovie"

export default function InfoPage() {
  //Hooks
  const { movieId } = useParams()
  const { data: movie, isLoading } = useMovie(movieId)

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
        <MovieInfo movie={ movie } isLoading={ isLoading }/>
      </div>
    </div>
  )
}