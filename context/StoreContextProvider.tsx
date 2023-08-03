'use client'

//React
import React, { useState, createContext } from 'react'

//Interfaces
import iChildren from '@/interface/children'
import iUserContext from '@/interface/usercontext'
import iMovieContext from '@/interface/moviescontext'
import iFavoritesContext from '@/interface/favoritescontext'

import iUser from '@/interface/user'
import iMovie from '@/interface/movie'

//Contexts
export const StoreUserContext = createContext<iUserContext|null>(null)
// export const StoreMoviesContext = createContext<iMovieContext | null>(null)
// export const StoreFavoritesContext = createContext<iFavoritesContext | null>(null)

//Context Provide Wrapper
const StoreContextProvider = ({children}:iChildren) => {

  const [storeUser, setStoreUser] = useState({} as iUser)
  // const [storeMovies, setStoreMovies] = useState<iMovieContext | null>(null)
  // const [storeFavorites, setStoreFavorites] = useState<iFavoritesContext | null>(null)

  // const user = { storeUser, setStoreUser }
  // const movies = { storeMovies, setStoreMovies }
  // const favorites = { storeFavorites, setStoreFavorites }

  return (
    <StoreUserContext.Provider value={{storeUser, setStoreUser}}>
      {/* <StoreMoviesContext.Provider value={movies}> */}
        {/* <StoreFavoritesContext.Provider value={favorites}> */}
          { children }
        {/* </StoreFavoritesContext.Provider> */}
      {/* // </StoreMoviesContext.Provider> */}
    </StoreUserContext.Provider>
  )
}

export default StoreContextProvider