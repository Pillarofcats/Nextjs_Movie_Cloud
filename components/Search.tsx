'use client'

//React
import React, { useState, useEffect } from 'react'
//Hooks
import { useSearchDebounce } from '@/hooks/useSearchDebounce'
//Axios
import axios from 'axios'
//ReactIcons
import { GoSearch } from 'react-icons/go'
//Nextjs
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Search() {
  //Hooks
  const router = useRouter()

  const [input, setInput] = useState<string>("")
  const [searchMovies, setSearchMovies] = useState<any[] | []>([])

  const searchQuery = useSearchDebounce(input, 550)

  const querySearch = async () => {
    try {

      const { data } = await axios.post('/api/moviesearch', {
        query: searchQuery
      })

      setSearchMovies(data)

    } catch(error) {
      console.log('axios post error')
    }
  }

  useEffect(() => {

    if(searchQuery.length > 0){
      console.log('search query useeffect', searchQuery)
      querySearch()
    } else {
      setSearchMovies([])
    }
  
  }, [searchQuery])

  const topSearch = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(searchMovies.length < 1) return

    const movieId = searchMovies[0]['_id']['$oid']
    router.push(`/watch/${movieId}/info`)
  }

  return (
    <div className='relative flex flex-col'>
      <form onSubmit={ topSearch }>
        <input className="w-full text-white focus:outline-none indent-1 bg-gray-700 bg-opacity-80" onChange={(e) => setInput(e.target.value) } />
        <GoSearch className='absolute top-[50%] -translate-y-[50%] right-[2%]' />
      </form>
      <div className={`w-full absolute top-12 flex-col flex ${searchMovies.length >= 1 ? 'border' : 'hidden'}`}>
        {
          searchMovies.map((m, i) => {
            const id = m['_id']['$oid']
            return (<Link href={`/watch/${id}/info`} key={i} className={`text-center text-white items-center pt-1 sm:pt-0 bg-gray-800 bg-opacity-80 h-7 w-full ${searchMovies ? 'block' : 'hidden'}`}>
              { m.title }
            </Link>)
          })
        }
      </div>
    </div>
  )
}