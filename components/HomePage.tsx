'use client'

//React
import React, { useContext, useEffect } from 'react'
//Hooks
import useCurrentUser from '@/hooks/useCurrentUser'
import useMovieList from '@/hooks/useMovieList'
//Components
import Billboard from '@/components/Billboard'
import MovieList from '@/components/MovieList'
import Loading from '@/components/Loading'
//Context
import { StoreUserContext } from '@/context/StoreContextProvider'

const HomePage = () => {
  //Hooks
  const { data: user } = useCurrentUser()
  const { data: movies = [], isLoading } = useMovieList()

  const userContext = useContext(StoreUserContext)

  useEffect(() => {
    userContext?.setStoreUser(user)
  }, [user])

  //Check
  if(isLoading) return (<Loading />)

  return (
    <main className="text-white -mt-14 flex flex-col">
      <Billboard />
      <div className="flex flex-1">
        <MovieList movies={ movies } title="Trending Movies" />
      </div>
    </main>
  )
}

export default React.memo(HomePage)