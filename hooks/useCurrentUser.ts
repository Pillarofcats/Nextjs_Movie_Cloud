'use client'

//SWR
import useSWR from 'swr'
//Helper Fn's
import fetcher from '@/lib/fetcher'
//Interfaces
import iUser from '@/interface/user';

const useCurrentUser = () => {
  //Disable revalidation for static data
  const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher, {
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

export default useCurrentUser