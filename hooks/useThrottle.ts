'use client'

//React
import { useRef } from 'react'

export const useThrottle = (cb: (e:MouseEvent) => void, delay: number) => {

  const startDate = useRef(Date.now())

  return function(e:MouseEvent) {
    if(Date.now() - startDate.current >= delay) {
      cb(e);
      startDate.current = Date.now()
    }
  }
}