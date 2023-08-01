import iMovie from "@/interface/movie"

export default interface iMovieContext {
  storeMovies: iMovie[] | null
  setStoreMovies: React.Dispatch<React.SetStateAction<iMovie[] | null>>
}