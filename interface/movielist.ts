import iMovie from "@/interface/movie"

export default interface iMovieList {
  movies: iMovie[]
  title?: string
  isLoading?: boolean
}