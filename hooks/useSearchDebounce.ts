'use client'

//React
import {useEffect, useState} from "react"

export const useSearchDebounce = (query:string, time:number=600) => {

  const [debounceQuery, setDebounceQuery] = useState(query)

  useEffect(() => {

    const timeout = setTimeout(() => {
    setDebounceQuery(query)
  }, time)

  return () => {
    clearTimeout(timeout)
  }
}, [query, time])

  return debounceQuery
}