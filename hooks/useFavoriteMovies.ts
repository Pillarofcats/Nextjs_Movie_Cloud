'use client'

//SWR
import useSWR from "swr"
//Helper Fn's
import fetcher from "@/lib/fetcher"
//Interfaces
import iMovie from "@/interface/movie"

export default function useFavoriteMovies() {
  //Disable revalidation for static data
  const { data, error, isLoading, mutate } = useSWR('/api/favoritemovies', fetcher,{
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return {
    data,
    error,
    isLoading,
    mutate
  }
}