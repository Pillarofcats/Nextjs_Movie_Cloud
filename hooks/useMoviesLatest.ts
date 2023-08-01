'use client'

//SWR
import useSWR from 'swr'
//Helper Fn's
import fetcher from '@/lib/fetcher'

export default function useMoviesLatest() {
  //Disable revalidation for static data
  const { data, error, isLoading, mutate} = useSWR('/api/latest', fetcher, {
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