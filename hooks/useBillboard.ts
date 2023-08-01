'use client'

//SWR
import useSWR from 'swr'
//Helper Fn's
import fetcher from '@/lib/fetcher'
//Interfaces
import iMovie from '@/interface/movie'

const useBillboard = () => {
  //Disable revalidation for static data
  const { data, error, isLoading, mutate } = useSWR('/api/featured', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

export default useBillboard