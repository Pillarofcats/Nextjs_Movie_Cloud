//Axios
import axios from "axios"
//React
import React, { useCallback, useMemo } from 'react'
//Hooks
import useCurrentUser from "@/hooks/useCurrentUser"
import useFavoriteMovies from "@/hooks/useFavoriteMovies"
//Interface
import iFavoriteMovie from "@/interface/favoritemovie"
//ReactIcons
import { GoHeart, GoHeartFill } from 'react-icons/go'

export default function FavoriteMovieButton ({ movieId }:iFavoriteMovie){
  //Hooks
  const { mutate: mutateFavoriteMovies } = useFavoriteMovies()
  const { data: currentUser, mutate } = useCurrentUser()
  
  const isMovieFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || []

    return list.includes(movieId) 

  }, [currentUser, movieId])

  const toggleFavorite = useCallback(async () => {
    let response

    //Check
    if(isMovieFavorite) {
      //Unfavorite movie
      //If movie is favorited, delete the movie from favorite list by movieId
      //For axios data property must be added for deletion
      response = await axios.delete('/api/updatefavoritemovies', { data: { movieId } })
    } else {
      //Favorite movie
      //If the movie is NOT favorited, add the movie to favorite list by movieId
      response = await axios.post('/api/updatefavoritemovies', { movieId })
    }

    const updatedFavoriteIds = response?.data?.favoriteIds

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds
    } as any)

    mutateFavoriteMovies()

  }, [movieId, isMovieFavorite, currentUser, mutate, mutateFavoriteMovies])

  const HeartIcon = isMovieFavorite ? GoHeartFill : GoHeart

  return (
    <div onClick={ toggleFavorite } className={` self-center text-3xl hover:cursor-pointer ${ isMovieFavorite ? 'text-red-400' : 'hover:text-red-400 text-white' }`}>
      <HeartIcon />
    </div>
  )
}