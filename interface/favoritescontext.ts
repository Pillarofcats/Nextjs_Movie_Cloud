import iMovie from "./movie"

export default interface iFavoritesContext {
  storeFavorites: iMovie[] | null
  setStoreFavorites: React.Dispatch<React.SetStateAction<iMovie[] | null>>
}