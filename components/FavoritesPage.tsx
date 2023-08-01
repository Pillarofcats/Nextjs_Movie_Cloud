'use client'

//React
import React from "react"
//Components
import Navbar from "@/components/Navbar"
import MovieList from "@/components/MovieList"
//Hooks
import useFavoriteMovies from "@/hooks/useFavoriteMovies"
//NextAuth
import { useSession } from "next-auth/react"
//Nextjs
import { redirect } from 'next/navigation'

export default function FavoritesPage() {
  //Hooks
  const { data: favMovies = [], isLoading } = useFavoriteMovies()

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
        <MovieList movies={ favMovies } title="Favorite Movies" isLoading={ isLoading } />
      </div>
    </div>
  )
}